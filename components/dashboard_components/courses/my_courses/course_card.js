/*
@params course_detail.thumb
@params course_detail.name
@params course_detail.intercept
@params course_detail.type
@params course_detail.price_inr
*/
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

export default function course_card( {course_detail, course_id} ){
  //console.log(course_detail)
  const router = useRouter();
    return (
        <>
 <Card sx={{ maxWidth: 345, marginLeft: "30px", marginTop: "40px" }}>
      <CardMedia
        component="img"
        alt={course_detail.name}
        height="140"
        image={course_detail.thumb}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course_detail.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {course_detail.intercept}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => {router.push(`/learn/${course_id}`)}}>Continue learning</Button>
        <Button size="small">View syllabus</Button>
      </CardActions>
    </Card>
        </>
        )
}