// FooterCopy Component
export const FooterCopy = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer__copy">
      <span>&#169; {year} Haitam Elgharras. All rights reserved.</span>
    </div>
  );
};
