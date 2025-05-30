import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BadgeCheck, Clock, Truck, CheckCircle, Gift } from "lucide-react";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  verified: "bg-blue-100 text-blue-800",
  collected: "bg-indigo-100 text-indigo-800",
  completed: "bg-green-100 text-green-800",
  reward: "bg-purple-100 text-purple-800",
};

const statusIcons = {
  pending: <Clock className="w-5 h-5" />,
  verified: <BadgeCheck className="w-5 h-5" />,
  collected: <Truck className="w-5 h-5" />,
  completed: <CheckCircle className="w-5 h-5" />,
  reward: <Gift className="w-5 h-5" />,
};

const MyReports = () => {
  const user = useSelector((state) => state.auth.user);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/reports/user/${user._id}`);
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchReports();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center text-gray-600 mt-10">Loading reports...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Waste Reports</h1>

      {reports.length === 0 ? (
        <p className="text-gray-500">You haven't submitted any reports yet.</p>
      ) : (
        <div className="space-y-6">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white rounded-2xl shadow-md p-5 grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <img
                src={report.imageUrl}
                alt="Waste"
                className="w-full h-40 object-cover rounded-xl md:col-span-1"
              />
              <div className="md:col-span-3 space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {report.type || "Unknown type"}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      statusStyles[report.status || "pending"]
                    }`}
                  >
                    {statusIcons[report.status || "pending"]}
                    {report.status?.toUpperCase() || "PENDING"}
                  </span>
                </div>
                <p className="text-gray-600">
                  <strong>Amount:</strong> {report.amount}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {report.location}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Submitted:</strong> {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReports;
