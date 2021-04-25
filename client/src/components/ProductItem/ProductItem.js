import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const ProductItem = ({product}) => {
    const {_id,name,price,imageUrl}=product;
    console.log(product);
    const classes = useStyles();
    const history = useHistory()
    const handleBuyNow = (id) => {
      console.log(id);
        history.push(`/checkout/${id}`);
    }
    return (
    
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <IconButton aria-label="price">
          <AttachMoneyIcon />: {price} 
        </IconButton>
        <Button onClick={() => handleBuyNow(_id)} variant="contained" color="primary">
            Buy Now
        </Button>
      </CardActions>
    </Card>
    );
};

export default ProductItem;