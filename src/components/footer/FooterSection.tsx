import { FooterCopy } from "./FooterCopy";
import { FooterSocials } from "./FooterSocials";
import { FooterLinks } from "./FooterLinks";
import { FooterTitle } from "./FooterTitle";

const FooterSection = () => {
  return (
    <footer className="footer">
      <div className="footer__bg">
        <div className="footer__container container grid">
          <div>
            <FooterTitle />
          </div>
          <div>
            <FooterLinks />
          </div>
          <div>
            <FooterSocials />
          </div>
        </div>
        <FooterCopy />
      </div>
    </footer>
  );
};

export default FooterSection;
