import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Dashboard = () => (
  <div className="p-6">
    <Card>
      <CardHeader>
        <CardTitle>Selamat Datang di Dashboard Admin</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Login Berhasil! Sekarang kamu bisa mulai mengelola sistem top-up kamu.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default Dashboard;
