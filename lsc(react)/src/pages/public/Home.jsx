import { Link } from 'react-router-dom'
import backgroundHome from '../../assets/images/site/background-home.png'
import car1 from '../../assets/images/site/car1.jpg'
import car2 from '../../assets/images/site/car2.jpg'
import car3 from '../../assets/images/site/car3.jpg'
import motoring from '../../assets/images/site/motoring.jpg'
import goodwood from '../../assets/images/site/goodwood.jpg'
import electric from '../../assets/images/site/electric.jpeg'
import about from '../../assets/images/site/about.png'

const CAR_TYPES = [
  { label: 'Coupe', image: car1 },
  { label: 'Sedan', image: car2 },
  { label: 'SUV', image: car3 },
]

// static placeholder posts, not wired up to any real content yet
const BLOG_POSTS = [
  {
    image: motoring,
    date: '12 October 2023',
    title: 'Festival Of Motoring',
    excerpt: 'A look back at this year’s biggest celebration of cars, old and new.',
  },
  {
    image: goodwood,
    date: '3 July 2023',
    title: 'Goodwood Festival of Speed',
    excerpt: 'Highlights from the legendary hillclimb and the cars that stole the show.',
  },
  {
    image: electric,
    date: '28 May 2023',
    title: 'The Rise of Electric Cars',
    excerpt: 'Why electric vehicles are becoming a bigger part of the market every year.',
  },
]

export default function Home() {
  return (
    <>
      <section className="home" id="home" style={{ '--home-bg': `url(${backgroundHome})` }}>
        <div className="home-info">
          <h1>
            Find Your Next Car
            <br />
            At The <span>BEST PRICE</span>
          </h1>
          <p>
            Let us guide you through a stress-free, innovative approach
            <br /> to finding the car of your dreams
          </p>
          <Link to="/cars" className="button">
            Take A Look Around
          </Link>
        </div>
      </section>

      <section className="cars" id="cars">
        <section className="heading">
          <span>Premium Cars</span>
          <p>We offer professional car sales services across our range of premium vehicles</p>
        </section>

        <div className="cars-container container">
          {CAR_TYPES.map((type) => (
            <div className="box" key={type.label}>
              <img src={type.image} alt={type.label} />
              <h2>{type.label}</h2>
            </div>
          ))}
        </div>
      </section>

      <section className="blog" id="blog">
        <section className="heading">
          <span>From The Blog</span>
          <p>The latest news and stories from the world of cars</p>
        </section>

        <div className="blog-container container">
          {BLOG_POSTS.map((post) => (
            <div className="box" key={post.title}>
              <img src={post.image} alt={post.title} />
              <span>{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a href="#" className="blog-btn">
                Read More <i className="bx bx-right-arrow-alt" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-info container">
          <div className="about-pic">
            <img src={about} alt="About Los Santos Customs" />
          </div>
          <div className="about-info-text">
            <span>Who We Are</span>
            <h2>About Los Santos Customs</h2>
            <p>
              We&apos;re a student-built car dealership platform, simulating everything from
              browsing inventory to booking test drives and managing staff.
            </p>
            <Link to="/team" className="button">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
