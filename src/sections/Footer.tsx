import React from "react";
import Link from "next/link";

const footerLinks = [
  {
    heading: "The Craftly Shop",
    links: [
      { text: "About us", src: "/about/" },
      { text: "Contact us", src: "/about/#contactUs" },
      { text: "Contact", src: "/about/#contactUs" },
      { text: "Chat On Whatsapp", src: "https://wa.me/919609096095"},
    ],
  },
  // {
  //   heading: "Services",
  //   links: [
  //     { text: "Track shipment", src: "/about" },
  //     { text: "Contact", src: "/" },
  //     { text: "Login", src: "/auth/login" },
  //     { text: "Join us", src: "/auth/register" },
  //   ],
  // },
  {
    heading: "Legal",
    links: [
      { text: "Return Policy", src: "/legal/#return-policy" },
      { text: "Shipping Policy", src: "/legal/#shipping-policy" },
      { text: "Privacy & Policy", src: "/legal/#privacy-policy" },
      { text: "Terms and Conditions", src: "/legal/#terms-condition" },
    ],
  },
  {
    heading: "Contact Information",
    links: [
      { text: "Address :- Akulnagar", src: "/" },
      { text: "Murshidabad, West Bengal", src: "/" },
      { text: "India , 742302", src: "/" },
       { text: " (24 x 7 Whatsapp Chatbot )", src: "https://wa.me/918503885083"} ,
      { text: "+91 85038 85083 ", src: "https://wa.me/918503885083", class: "underline"} ,
      { text: "+91 96090 96095", src: "https://919609096095" ,class: "underline"},
      {
        text: "thecraftlyshop@gmail.com",
        src: "mailto:thecraftlyshop@gmail.com",
        class: "underline",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="grid lg:place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {footerLinks.map((footer, footerIndex) => (
            <ul key={footerIndex}>
              <li className="font-bold mb-3">{footer.heading}</li>
              {footer.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    className={`text-sm block pb-1 mb-1 w-max ${
                      link.class || ""
                    }`}
                    href={link.src}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <h3 className="text-center text-sm py-1 tracking-tight text-black/85">
        ©2025 All rights reserved by <b>JS Group</b>
      </h3>
    </footer>
  );
};

export default Footer;
