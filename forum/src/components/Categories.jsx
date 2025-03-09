import React from "react";
import styled from "styled-components";

const AccordionContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 20px auto;
  text-align: center;
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const AccordionList = styled.ul`
  display: flex;
  padding: 0;
  list-style: none;
  overflow: hidden;
  width: 100%;
  height: 250px;

  &:hover li {
    width: 8%;
  }

  &:hover li:hover {
    width: 60%;
    div {
      background: rgba(0, 0, 0, 0.5);
      * {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const AccordionItem = styled.li`
  flex: 1;
  transition: all 0.5s ease;
  position: relative;
  height: 250px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus-within,
  &:hover {
    flex: 6;
    div {
      background: rgba(0, 0, 0, 0.5);
      * {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const OverlayContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;

  h2, p {
    color: #fff;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const About = styled.p`
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  a {
    color: blue;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Image and Text Data
const accordionData = [
  {
    image: "https://i.pinimg.com/736x/f0/74/c0/f074c0f81acff74f5ebcfb2dc8787fe8.jpg",
    title: "Technology & Coding ",
    description: "Programming, AI, cybersecurity, and more.",
  },
  
  {
    image: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/6384511/jbareham_160418_0931_0086_FINAL_NO_BUFFER_5MB_02.0.jpg?quality=90&strip=all&crop=0%2C4.116413214473%2C100%2C91.767173571054&w=828 ",
    title: "Gadget & Innovation",
    description: "Latest tech trends, smartphones, and AI tools.",
  },
  {
    image: " https://www.thebusinessrankers.com/wp-content/uploads/2020/10/startup-1024x576.jpeg",
    title: " Business & Startups ",
    description: "Entrepreneurship, marketing, and finance.",
  },
  {
    image: " https://www.marketingtechnews.net/wp-content/uploads/2020/03/iStock-489253366.jpg",
    title: "Gaming & Entertaiment",
    description: "Games, movies, and pop culture.",
  },
  {
    image: "https://academicworld.co.in/wp-content/uploads/2022/07/Aws-Career-.jpg  ",
    title: "Career & Education   ",
    description: " Job tips, interview prep, and online learning.",
  },
  {
    image: "https://www.c2ti.com/wp-content/uploads/2013/10/Ideas.jpg",
    title: "Off -topic Louge",
    description: "Random discussions, polls, and fun topics!",
  },
];

const Accordion = () => {
  return (
    <AccordionContainer>
     
      <AccordionList>
        {accordionData.map((item, index) => (
          <AccordionItem key={index} style={{ backgroundImage: `url(${item.image})` }} tabIndex={index + 1}>
            <OverlayContent  className=" text-2xl  font-extrabold  text-black " >
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </OverlayContent>
          </AccordionItem>
        ))}
      </AccordionList>
     
    </AccordionContainer>
  );
};

export default Accordion;
