import { useEffect, useState } from "react";
import { useDataProvider, Loading } from "react-admin";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
// Icons
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

import { StatCard } from "../components/custom/StatCard";

// Komponen Internal untuk Best Selling Products
const BestSellingProducts = ({ products }: { products: any[] }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        boxShadow: isDarkMode
          ? "0px 4px 20px rgba(0,0,0,0.5)"
          : "0px 4px 20px rgba(0,0,0,0.05)",
        border: `1px solid ${theme.palette.divider}`,
        mt: 4,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <StarRoundedIcon sx={{ color: "warning.main" }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Best Selling Products
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {products && products.length > 0 ? (
            products.map((item, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "auto 1fr",
                      md: "60px 2fr 1fr 1fr 1fr 1.5fr",
                    },
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={item.image_url}
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: theme.palette.grey[200],
                    }}
                  />

                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {item.name}
                  </Typography>

                  <Box
                    sx={{
                      display: { xs: "none", md: "block" },
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={800}
                      color="info.main"
                    >
                      {item.orders}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Orders
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: { xs: "none", md: "block" },
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={800}
                      color="success.main"
                    >
                      {item.paid}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Paid
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: { xs: "none", md: "block" },
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={800}
                      color="warning.main"
                    >
                      {item.paidRatio}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Ratio
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 800, color: "success.main" }}
                    >
                      {item.formattedRevenue}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: { md: "none" } }}
                    >
                      {item.paid} Paid | {item.paidRatio}
                    </Typography>
                  </Box>
                </Box>
                {index < products.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="center"
              sx={{ py: 2 }}
            >
              Belum ada data produk terlaris.
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const dataProvider = useDataProvider();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataProvider
      .getOne("herama-analytics", { id: "current" })
      .then(({ data }) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [dataProvider]);

  if (loading) return <Loading />;
  if (!stats) return null;

  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? "transparent"
            : theme.palette.grey[50],
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* HEADER & SALDO DIGIFLAZZ (PALING ATAS) */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { md: "center" },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: theme.palette.text.primary }}
            >
              Dashboard Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Ringkasan performa bisnis Herama Top-Up.
            </Typography>
          </Box>

          {/* Kartu Saldo dengan Gradasi */}
          <Card
            elevation={0}
            sx={{
              minWidth: { md: 320 },
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(45deg, #1e3a8a 30%, #1e40af 90%)"
                  : "linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)",
              color: "white",
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(37, 99, 235, 0.2)",
            }}
          >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    width: 48,
                    height: 48,
                  }}
                >
                  <AccountBalanceWalletRoundedIcon sx={{ fontSize: 28 }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.8,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Balance
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {stats.digiflazzBalance}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* BARIS 1: STATISTIK TRANSAKSI (4 KOLOM) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            mb: 4,
          }}
        >
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<ShoppingCartRoundedIcon fontSize="large" />}
            colorKey="info"
          />
          <StatCard
            title="Total Paid"
            value={stats.totalPaid}
            icon={<PaymentsRoundedIcon fontSize="large" />}
            colorKey="success"
          />
          <StatCard
            title="Paid Ratio"
            value={stats.paidRatio}
            icon={<DonutSmallRoundedIcon fontSize="large" />}
            colorKey="warning"
          />
          <StatCard
            title="Unpaid Orders"
            value={stats.unpaidOrders}
            icon={<CancelPresentationRoundedIcon fontSize="large" />}
            colorKey="error"
          />
        </Box>

        {/* BARIS 2: INVENTORY SUMMARY (2 KOLOM) */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}
        >
          Inventory Summary
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            mb: 4,
          }}
        >
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<Inventory2RoundedIcon fontSize="large" />}
            colorKey="secondary"
            info="Jumlah seluruh produk yang tersedia di sistem."
          />
          <StatCard
            title="Total Categories"
            value={stats.totalCategories}
            icon={<CategoryRoundedIcon fontSize="large" />}
            colorKey="warning"
            info="Jumlah kategori game atau layanan aktif."
          />
        </Box>

        {/* BARIS 3: FINANCIAL INSIGHTS (3 KOLOM) */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}
        >
          Financial Insights
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            mb: 4,
          }}
        >
          <StatCard
            title="Gross Revenue"
            value={stats.grossRevenue}
            icon={<MonetizationOnRoundedIcon fontSize="large" />}
            colorKey="primary"
            isCurrency
            info="Total kotor dari semua transaksi sukses."
          />
          <StatCard
            title="Net Revenue"
            value={stats.netRevenue}
            icon={<AccountBalanceWalletRoundedIcon fontSize="large" />}
            colorKey="secondary"
            isCurrency
            info="Pendapatan setelah dikurangi biaya operasional."
          />
          <StatCard
            title="Net Profit"
            value={stats.netProfit}
            icon={<AccountBalanceWalletRoundedIcon fontSize="large" />}
            colorKey="success"
            isCurrency
            info="Keuntungan bersih (Gross Revenue - Modal)."
          />
        </Box>

        {/* BARIS 4: PRODUK TERLARIS */}
        <BestSellingProducts products={stats.bestSelling || []} />
      </Container>
    </Box>
  );
};

export default Dashboard;
