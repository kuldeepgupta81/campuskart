import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import MapTracker from "../components/MapTracker";
import Recommendation from "../components/Recommendation";
import products from "../data/products";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // 🔥 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");

      const updated = res.data.map((o) => {
        const time = new Date(o.createdAt).getTime();
        const diffHours = (Date.now() - time) / (1000 * 60 * 60);

        let status = o.status || "Ordered";

        if (!o.status) {
          if (diffHours > 72) status = "Delivered";
          else if (diffHours > 48) status = "Out for Delivery";
          else if (diffHours > 24) status = "Shipped";
        }

        return { ...o, status };
      });

      setOrders(updated);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 STEP TRACKER
  const getStep = (status) => {
    if (status === "Ordered") return 1;
    if (status === "Shipped") return 2;
    if (status === "Out for Delivery") return 3;
    if (status === "Delivered") return 4;
    return 1;
  };

  // 🔥 DOWNLOAD INVOICE
  const downloadInvoice = async (order) => {
    const doc = new jsPDF();

    try {
      doc.addImage("/logo.png", "PNG", 15, 10, 25, 25);
    } catch {}

    let y = 20;

    doc.setFontSize(18);
    doc.text("CampusKart", 45, y);
    doc.setFontSize(14);
    doc.text("INVOICE", 150, y);

    y += 10;

    doc.setFontSize(11);
    doc.text(
      `Date: ${new Date(order.createdAt).toLocaleString("en-IN")}`,
      140,
      y
    );
    y += 8;

    doc.text(`Invoice ID: ${order._id}`, 140, y);
    y += 15;

    doc.text(`Name: ${order.address?.name || "User"}`, 20, y);
    y += 8;

    doc.text(`Address: ${order.address?.city || "Not Provided"}`, 20, y);
    y += 10;

    doc.text("Item", 20, y);
    doc.text("Price", 150, y);
    y += 8;

    let total = 0;

    order.items.forEach((item) => {
      doc.text(item.name, 20, y);
      doc.text(`₹${item.price}`, 150, y);
      y += 8;
      total += item.price;
    });

    y += 10;

    const gst = total * 0.18;
    const finalTotal = total + gst;

    doc.text(`Subtotal: ₹${total}`, 120, y);
    y += 8;
    doc.text(`GST (18%): ₹${gst.toFixed(2)}`, 120, y);
    y += 8;
    doc.text(`Total: ₹${finalTotal.toFixed(2)}`, 120, y);

    const qr = await QRCode.toDataURL(
      `upi://pay?pa=test@upi&pn=CampusKart&am=${finalTotal}`
    );

    doc.addImage(qr, "PNG", 20, y + 10, 40, 40);

    doc.setFontSize(10);
    doc.text("Scan & Pay", 20, y + 55);
    doc.text("Thank you ❤️", 20, y + 65);

    doc.save(`invoice_${order._id}.pdf`);
  };

  // 🔥 EMAIL + WHATSAPP FALLBACK
  const sendEmail = async (order) => {
    try {
      await axios.post("http://localhost:5000/api/send-invoice", {
        order,
      });

      alert("📧 Invoice sent successfully!");
    } catch (err) {
      console.log("Email failed → WhatsApp fallback");

      // 🔥 USER PHONE
      const user = JSON.parse(localStorage.getItem("user"));
      const phone = user?.phone || "918112521793";

      const total = order.items.reduce((s, i) => s + i.price, 0);

      const message = `🧾 CampusKart Invoice
Order ID: ${order._id}
Total: ₹${total}

Thank you for shopping ❤️`;

      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.open(url, "_blank");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📦 My Orders</h1>

      {orders.map((o) => {
        const total = o.items.reduce((s, item) => s + item.price, 0);
        const step = getStep(o.status);

        return (
          <div key={o._id} className="bg-white p-5 mb-6 rounded-xl shadow">

            <p className="font-bold text-lg">₹{total}</p>
            <p className="text-sm text-gray-500">
              {new Date(o.createdAt).toLocaleString("en-IN")}
            </p>

            <p className="text-sm mt-1">
              📍 {o.address?.name || "User"}, {o.address?.city || "City"}
            </p>

            <p className="text-purple-600 font-semibold mt-2">
              Status: {o.status}
            </p>

            <div className="flex justify-between mt-3 text-xs">
              {["Ordered", "Shipped", "Out", "Delivered"].map((label, idx) => (
                <div key={idx} className="w-full text-center">
                  <div
                    className={
                      step > idx
                        ? "bg-green-500 h-2"
                        : "bg-gray-300 h-2"
                    }
                  ></div>
                  <p>{label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              {o.items.map((item, idx) => (
                <div key={idx} className="border p-2 rounded">
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                </div>
              ))}
            </div>

            {o.status !== "Delivered" && (
              <div className="mt-3">
                <p className="font-semibold">📍 Live Tracking</p>
                <MapTracker />
              </div>
            )}

            <Recommendation products={products} />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => downloadInvoice(o)}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Invoice
              </button>

              <button
                onClick={() => sendEmail(o)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Send Mail
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
}