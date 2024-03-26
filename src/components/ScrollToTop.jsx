// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// // function ScrollToTop() {
// //   const { pathname } = useLocation();

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, [pathname]);

// //   return null;
// // }

// // export default ScrollToTop;
// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// export default ScrollToTop;

// import { useEffect } from "react";
// import { useHistory } from "react-router-dom";

// function ScrollToTop() {
//  let history = useHistory();

//   useEffect(() => {
//     const unlisten = history.listen(() => {
//       window.scrollTo(0, 0);
//     });
//     return () => {
//       unlisten();
//     };
//   }, []);

//   return null;
// }

// export default ScrollToTop;

// import { useLayoutEffect } from "react";
// import { useLocation } from "react-router-dom";

// export default function ScrollToTop() {
//   const location = useLocation();

//   useLayoutEffect(() => {
//     if (location.hash) {
//       let elem = document.getElementById(location.hash.slice(1));
//       if (elem) {
//         elem.scrollIntoView({ behavior: "smooth" });
//       }
//     } else {
//       window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//     }
//   }, [location]);

//   return null;
// }

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView();
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}


