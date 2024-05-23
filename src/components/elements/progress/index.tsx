import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Progress(props: { size: number }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <CircularProgress sx={{ color: "white" }} size={props.size} />
    </Box>
  );
}
