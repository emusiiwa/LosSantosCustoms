import { useState } from 'react'
import casey from '../../assets/images/employees/casey.jpg'
import roland from '../../assets/images/employees/roland.jpg'
import manu from '../../assets/images/employees/manu.png'
import '../../styles/team.css'

const TEAM = [
  {
    name: 'Casey Chuma',
    role: 'Lead Analyst',
    image: casey,
    bio: 'Casey is a 3rd year student majoring in Computer Science and Mathematics. He is a great programmer capable of working greatly in a team. An Artist who expresses his art through dance.',
  },
  {
    name: 'Roland Chuma',
    role: 'Lead Project Developer',
    image: roland,
    bio: 'Roland is a 3rd year student majoring in Computer Science and Information Systems. He is an efficient programmer and works well under pressure. A fan of drones and likes piloting them.',
  },
  {
    name: 'Emmanuel Musiiwa',
    role: 'Project Manager',
    image: manu,
    bio: 'Emmanuel is a 3rd year student majoring in Computer Science and Information Systems. He is a very good code analyst and is responsible for thorough testing of the code we produce. Big car enthusiast and prefers BMW to Mercedes cars.',
  },
]

export default function Team() {
  const [zoomed, setZoomed] = useState(null) // name of the currently hovered card, if any

  return (
    <section className="wrapper">
      <h1>Our Team</h1>

      <div className="our_team">
        {TEAM.map((member) => (
          <div
            key={member.name}
            className={`team_member${zoomed === member.name ? ' zoomed' : ''}`}
            onMouseEnter={() => setZoomed(member.name)}
            onMouseLeave={() => setZoomed(null)}
          >
            <div className="member_img">
              <img src={member.image} alt={member.name} />
              <div className="social_media">
                <a href="#" className="item">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="item">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="item">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
            <h3>{member.name}</h3>
            <span>{member.role}</span>
            <p className="zoom-paragraph">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
