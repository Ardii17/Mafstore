import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";

export default function Progress() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <CircularProgress sx={{ color: "white",  }} size={30} />
    </Box>
  );
}
