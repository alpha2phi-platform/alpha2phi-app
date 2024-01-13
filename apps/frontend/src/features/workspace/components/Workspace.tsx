import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Portfolio from "./Portfolio";

export const Workspace = () => {
  return (
    <Grid container spacing={3}>
      {/* Portfolio */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 480,
          }}
        >
          <Portfolio />
        </Paper>
      </Grid>
      {/* TODO */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          {/* <Portfolio /> */}
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          {/* <Orders /> */}
        </Paper>
      </Grid>
    </Grid>
  );
};
