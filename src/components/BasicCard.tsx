import React from 'react';
import {
  Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface BasicCardProps {
  title: string;
  detail: string;
  date: string;
}

const BasicCard: React.FC<BasicCardProps> = ({ title, detail, date }) => (
  <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {date}
      </Typography>
      <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
        {detail}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">
        <FavoriteIcon sx={{ color: 'text.secondary' }} />
      </Button>
      <Button size="small">
        <EditIcon sx={{ color: 'text.secondary' }} />
      </Button>
      <Button size="small">
        <DeleteIcon sx={{ color: 'text.secondary' }} />
      </Button>
    </CardActions>
  </Card>
);

export default BasicCard;
