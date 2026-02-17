// src/pages/dashboard/components/StatCard.tsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  useTheme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorKey: "primary" | "secondary" | "error" | "warning" | "info" | "success"; // Ubah cara menerima warna
  info?: string;
  isCurrency?: boolean;
}

export const StatCard = ({
  title,
  value,
  icon,
  colorKey = "primary",
  info,
  isCurrency,
}: StatCardProps) => {
  const theme = useTheme();
  // Mengambil warna dari tema (light untuk background bubble, main untuk ikon)
  const mainColor = theme.palette[colorKey].main;
  // Membuat warna latar belakang transparan yang aman untuk dark/light mode
  const backgroundColor =
    theme.palette.mode === "dark"
      ? theme.palette[colorKey].dark
      : theme.palette[colorKey].light + "40"; // Menambah alpha 40%

  return (
    <Card
      elevation={0} // Mulai dengan 0, kita pakai custom shadow di sx
      sx={{
        height: "100%",
        borderRadius: 4, // Sudut lebih bulat
        // Efek bayangan lembut dan border halus
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 4px 20px rgba(0, 0, 0, 0.5)"
            : "0px 4px 20px rgba(0, 0, 0, 0.05)",
        border: `1px solid ${theme.palette.divider}`,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)", // Efek naik sedikit saat di-hover
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 8px 25px rgba(0, 0, 0, 0.6)"
              : "0px 8px 25px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardContent
        sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          {/* Icon Bubble yang menarik */}
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: backgroundColor,
              color: mainColor,
              width: 56,
              height: 56,
              borderRadius: 3,
            }}
          >
            {icon}
          </Avatar>

          {info && (
            <Tooltip title={info} arrow placement="top">
              <IconButton size="small" sx={{ color: "text.secondary" }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Box sx={{ mt: "auto" }}>
          {/* Judul di atas */}
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={600}
            sx={{ mb: 0.5, textTransform: "uppercase", letterSpacing: 1 }}
          >
            {title}
          </Typography>
          {/* Nilai Utama yang Besar dan Jelas */}
          <Typography
            variant={isCurrency ? "h4" : "h3"} // Mata uang sedikit lebih kecil agar muat di mobile
            sx={{
              fontWeight: 800,
              color: isCurrency
                ? theme.palette.success.main
                : theme.palette.text.primary,
              // Responsif font size agar tidak terlalu besar di HP kecil
              fontSize: {
                xs: isCurrency ? "1.8rem" : "2.2rem",
                md: isCurrency ? "2.125rem" : "3rem",
              },
            }}
          >
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
