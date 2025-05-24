import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

// Couleurs du site
const redMain = "#b31b1b";

const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  textAlign: "center",
  "&:hover": {
    textDecoration: "underline",
    color: "#ffe2e2",
  },
}));

const ExternalLink = styled("a")(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  textAlign: "center",
  "&:hover": {
    textDecoration: "underline",
    color: "#ffe2e2",
  },
}));

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: "auto", width: "100%", bgcolor: redMain, color: "white", py: 4 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
          textAlign="center"
        >
          {/* Quick Links */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <Stack spacing={0.5} alignItems="center">
              <StyledLink to="/">Home</StyledLink>
              <StyledLink to="/HowItWorks">How It Works</StyledLink>
              <StyledLink to="/About">About Us</StyledLink>
            </Stack>
          </Box>

          {/* Account */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>Account</Typography>
            <Stack spacing={0.5} alignItems="center">
              <StyledLink to="/Login">Login</StyledLink>
              <StyledLink to="/Login">Register</StyledLink>
            </Stack>
          </Box>

          {/* Contact */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>Connect With Us</Typography>
            <Stack direction="row" spacing={1} justifyContent="center" mt={1}>
              <IconButton size="small" sx={{ color: "white" }} component={ExternalLink} href="https://www.facebook.com/GriffithCollegeDublin/" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton size="small" sx={{ color: "white" }} component={ExternalLink} href="https://x.com/griffithcollege" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton size="small" sx={{ color: "white" }} component={ExternalLink} href="https://www.instagram.com/griffithcollege/" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton size="small" sx={{ color: "white" }} component={ExternalLink} href="https://www.youtube.com/@griffithcollege" target="_blank">
                <YouTube />
              </IconButton>
            </Stack>
            <Typography mt={2} variant="body2">
              Email: <ExternalLink href="mailto:international@griffith.ie">international@griffith.ie</ExternalLink>
            </Typography>
            <Typography mt={1} variant="body2">
              &copy; 2025 Griffith AI. All rights reserved.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}