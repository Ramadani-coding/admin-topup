import { useState } from "react";
import { useNotify, useRefresh, Confirm } from "react-admin";
import { Button } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

const SyncButton = () => {
  const [open, setOpen] = useState(false);
  const notify = useNotify();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth_token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/products/sync`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await response.json();

      if (result.success) {
        notify(result.message, { type: "success" });
        refresh();
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      notify(`Error: ${error.message}`, { type: "error" });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        disabled={loading}
        startIcon={<SyncIcon />}
        sx={{
          bgcolor: "#e67e22", // Warna oranye sesuai gambar
          "&:hover": { bgcolor: "#d35400" },
          fontWeight: "bold",
          ml: 1,
        }}
      >
        {loading ? "Processing..." : "Sinkronisasi Produk"}
      </Button>

      <Confirm
        isOpen={open}
        title="Sinkronisasi Produk"
        content="Are you sure you would like to do this?" // Teks sesuai gambar
        onConfirm={handleSync}
        onClose={() => setOpen(false)}
        confirmColor="warning"
      />
    </>
  );
};

export default SyncButton;
