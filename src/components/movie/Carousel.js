import React from 'react';
import { Carousel } from 'react-bootstrap';

import movie from '../../assets/movie.jpg'
import pop from '../../assets/pop.jpg'
import rest from '../../assets/rest.jpg'

/**Carousel effect ad images for user home page */
const CarouselContainer = () => {
  return (<>
  <Carousel>
  <Carousel.Item interval={0}>
    <img
      className="d-block w-100 "
      src={movie}
      alt="No Image Found"
    />
  </Carousel.Item>
  <Carousel.Item interval={0}>
    <img
      className="d-block w-100"
      src={pop}
      alt="No Image Found"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={rest}
      alt="No Image Found"
    />
  </Carousel.Item>
</Carousel>
  </>)
   
}

export default CarouselContainer;