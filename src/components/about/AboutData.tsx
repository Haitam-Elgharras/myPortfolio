import type { CSSProperties } from "react";
import AboutButtons from "./AboutButtons";
import AboutInfo from "./AboutInfo";

const AboutData = () => {
  return (
    <div className="about__data reveal" style={{ "--rd": "120ms" } as CSSProperties}>
      <p className="about__description">
        I&apos;m Haitam Elgharras, a software engineer in Morocco focused on
        backend systems, scalable web applications, and distributed
        architectures. My work spans Java, Spring Boot, React, TypeScript,
        Docker, and Kafka so I can build complete products with reliable
        delivery, strong performance, and maintainable code.
      </p>
      <AboutInfo />
      <AboutButtons />
    </div>
  );
};

export default AboutData;
