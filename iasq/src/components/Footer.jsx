const Footer = () => {
  return (
    <footer>
      <div className="grid grid-cols-4 px-[65px] gap-[20px] py-[64px] bg-[#191d23] text-white">
        <div>
          <h3 className="mb-[18px] font-bold text-[22px]">IASQ</h3>
          <p className="font-normal text-[14px]">
            Ask anything, get AI-powered summaries, and test your knowledge with
            smart quizzes to learn faster and smarter
          </p>
        </div>
        <div>
          <ul>
            <li className="cursor-pointer">
              <a href="#hero">Home</a>
            </li>
            <li className="cursor-pointer">
              <a href="#features">Features</a>
            </li>
            <li className="cursor-pointer">
              <a href="#About">About</a>
            </li>
            <li className="cursor-pointer">
              <a href="#hero">Our Team</a>
            </li>
            <li className="cursor-pointer">
              <a href="#pricing">Pricing</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-[18px] font-bold text-[22px]">Support</h3>
          <ul>
            <li className="cursor-pointer">
              <a href="#hero">Contact Us</a>
            </li>
            <li className="cursor-pointer">
              <a href="#features">Help Center</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-[18px] font-bold text-[22px]">Useful Links</h3>
          <ul>
            <li>
              <a href="#">Github</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
      <div id="copyright" className="bg-[#0d0f11] text-center">
        <p className="text-white text-[14px] font-normal py-[20px]">
          Copyright &copy;2025 - IASQ
        </p>
      </div>
    </footer>
  );
};

export default Footer;
