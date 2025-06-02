import { FileText, Users, Gift, TrendingUp, CheckCircle, Clock, AlertTriangle } from "lucide-react"

const AdminLayout = () => {
  const stats = [
    { title: "Total Reports", value: "1,234", icon: FileText, color: "bg-blue-500", change: "+12%" },
    { title: "Active Users", value: "856", icon: Users, color: "bg-green-500", change: "+8%" },
    { title: "Rewards Given", value: "2,456", icon: Gift, color: "bg-purple-500", change: "+15%" },
    { title: "Completion Rate", value: "87%", icon: TrendingUp, color: "bg-orange-500", change: "+3%" },
  ]

  const recentReports = [
    { id: "R001", user: "John Doe", location: "Central Park", status: "pending", time: "2 hours ago" },
    { id: "R002", user: "Jane Smith", location: "Main Street", status: "verified", time: "4 hours ago" },
    { id: "R003", user: "Mike Johnson", location: "Beach Road", status: "completed", time: "6 hours ago" },
    { id: "R004", user: "Sarah Wilson", location: "City Center", status: "collected", time: "8 hours ago" },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "verified":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "collected":
        return <TrendingUp className="h-4 w-4 text-purple-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "verified":
        return "bg-blue-100 text-blue-800"
      case "collected":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your waste management platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(report.status)}
                      <span
                        className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}
                      >
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
