import { 
    Box, 
    Card, 
    CardContent, 
    CardMedia, 
    Container, 
    Grid, 
    Paper, 
    Typography 
} from "@mui/material";

export default function About() {
    const teamMembers = [
        {
            name: "Maia",
            role: "Griffith AI",
        },
        {
            name: "Luna",
            role: "Griffith AI",
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Typography variant="h3" component="h1" align="center" sx={{ mb: 5 }}>
                Meet Our Team
            </Typography>

            <Grid container spacing={3}>
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                sx={{ aspectRatio: '16/9' }}
                                image="/api/placeholder/400/225"
                                alt={`Team Member - ${member.name}`}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h5" component="h3" gutterBottom>
                                    {member.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                    {member.role}
                                </Typography>
                                <Typography variant="body2">
                                    {member.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Container>
    );
}