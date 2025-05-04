import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-200 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Help & Support</a></li>
              <li><a href="#" className="hover:underline">Trust & Safety</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Browse Jobs</a></li>
              <li><a href="#" className="hover:underline">Browse Freelancers</a></li>
              <li><a href="#" className="hover:underline">Categories</a></li>
              <li><a href="#" className="hover:underline">Projects</a></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400 transition">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="hover:text-green-400 transition">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="hover:text-green-400 transition">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a href="#" className="hover:text-green-400 transition">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} FASTROzgaar. All rights reserved.</p>
          <p>
            Made with ❤️ by <a href="#" className="text-green-400 hover:underline">PakTekHireTeam</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
