import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import "./App.css";

/* Footer */
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Sub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
/* Project description */
export default function StickyFooter() {
  return (
    <div className="secondPage-description" id="footer">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography
            sx={{
              fontFamily: "sans-serif",
            }}
            variant="h3"
            component="h1"
            gutterBottom
          >
            An online Subtitle Service to let you focus on your content
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            What is SüB?
          </Typography>
          <Typography variant="body1">
            Sub is an online service that allows you to add subtitles to your
            videos. For the moment we only offer the service for videos that are
            using french.{" "}
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Why use SüB?
          </Typography>
          <Typography variant="body1">
            Captioning your videos can have a big effect on how successful they
            are. This is true for movies, TV shows, social media videos,
            training content, and any other kind of video you might record and
            share.
            <br></br>
            <br></br>
            You’ve probably heard that 85% of Facebook videos are watched on
            mute. Of course, that’s just for a single social network. Snapchat,
            for example, says that two-thirds of its videos are played with
            sound.
            <br></br>
            <br></br>
            No matter what the statistics say, many people silence audio on
            their phones or computers because they don’t want or need to. Maybe
            they’re listening to their favorite song and don’t want to pause it.
            Or they’re in a public place and can’t be disruptive.
            <br></br>
            <br></br>
            Even if your videos target an audience that’s likely to turn video
            sound on, there are going to be some people who won’t. And those
            people will miss out on your video if it’s not subtitled.
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            How to use SüB?
          </Typography>
          <Typography variant="body1">
            1. Drop your mp4 file in the box <br></br>2. Click on Send video{" "}
            <br></br>3. The new file with subtitles should be downloaded to your
            system{" "}
          </Typography>
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">Made By Gabriel Côté</Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </div>
  );
}
