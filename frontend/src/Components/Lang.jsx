import { Link } from "lucide-react";
import React from "react";

const Lang = ({ darkMode }) => {
  window.onload = function () {
    // Google translate
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: true,
        },
        "google_translate_element"
      );
    };
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
    setInterval(() => {
      try {
        document.getElementById(":1.container").style.transform = "scale(0)";
        document.getElementById(":1.container").parentElement.style.transform =
          "scale(0)";
        document.getElementsByTagName("body")[0].style.top = "0px";
        document.getElementById("google_translate_element").style.transform =
          "scale(0)";
      } catch (e) {}
    }, 500);
  };

  return (
    <div className="relative group z-50">
      <div className="absolute top-0 left-0 scale-0 -translate-y-[400%] w-0 h-0">
        <div id="google_translate_element"></div>
      </div>
      <button className="w-8">
        {darkMode ? (
          <svg
            fill="#fff"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 190.701 190.701"
            xml:space="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="M152.069,184.394c-2.659-15.571-26.047-18.899-39.647-19.344c-0.004-0.035,0.007-0.068,0.002-0.104 c-0.01-0.121-0.021-0.298-0.026-0.608c-0.022-1.076-0.112-0.805-0.218-1.845c-0.174-1.713-0.276-3.433-0.381-5.15 c-0.191-3.187-0.366-6.385-0.391-9.578c-0.008-1.064-0.342-1.87-0.849-2.455c-0.022-0.398-0.22-0.793-0.613-1.065 c-4.608-3.194-10.747-3.233-16.104-4.801c-10.406-3.045-19.686-9.057-27.932-15.941C49.276,109.611,39.908,89.097,42.929,67.42 C45.442,49.378,57.292,39.011,72.9,32.566c6.206-2.562,12.551-4.791,18.965-6.77c2.218-0.686,4.466-1.231,6.729-1.738 c3.188-0.714,4.456,0.662,3.136-0.981c1.383,1.723,4.121,0.598,4.674-1.234c0.289-0.957,0.35-1.748,0.249-2.42 c0.083-0.307,0.177-0.609,0.244-0.924c0.669-0.572,1.124-1.435,1.093-2.673c-0.104-4.072-0.509-8.159-0.588-12.254 c-0.091-4.759-7.484-4.768-7.389,0c-0.049,2.573-0.318,5.75-0.094,8.693c0.018,1.44,0.091,2.868,0.265,4.252 c-7.641,0.419-19.46,5.068-21.063,5.644c-17.42,6.245-33.175,13.408-40.181,32.115c-8.859,23.653-2.413,47.027,13.221,66.058 c8.383,10.204,33.604,30.869,50.76,28.729c-0.399,4.859-0.496,9.779-0.506,14.635c0,0.576,0.155,1.074,0.386,1.524 c-15.278,1.071-32.75,6.177-41.493,18.717c-0.087,0.053-0.185,0.078-0.271,0.133c-1.895,1.189-1.35,4.929,1.246,4.602 c5.348-0.674,72.694,6.061,84.078-1.879c0.197,0.197,0.395,0.378,0.592,0.579C149.258,189.738,152.557,187.242,152.069,184.394z"></path>
                  <path d="M155.44,74.597c-2.95-24.854-28.264-40.65-51.678-40.129C78.3,35.034,61.871,56.623,59.685,80.001 c-0.713,0.878-0.837,2.229-0.216,3.146c-0.073,1.898-0.077,3.801,0.042,5.702c1.198,19.008,21.227,44.649,42.133,43.566 c1.041,0.797,2.462,1.074,3.944,0.245c6.014-3.367,13.57-3.048,19.802-6.305c7.806-4.079,13.801-9.382,19.366-16.217 C153.03,99.972,156.985,87.62,155.44,74.597z M147.894,76.364c-5.164-0.837-11.938-0.148-17.96,0.64 c-2.764-13.567-11.678-25.686-21.896-34.906c2.476,0.031,4.976,0.227,7.489,0.709C132.334,46.037,145.565,59.972,147.894,76.364z M107.045,119.256c1.479-10.945,1.55-21.91,1.393-32.925c5.016-0.229,10.032-0.539,15.042-0.82 C124.437,99.924,116.049,109.551,107.045,119.256z M119.112,78.325c-3.608,0.208-7.202,0.364-10.797,0.521 c-0.045-2.516-0.089-5.035-0.116-7.558c-0.08-7.469-0.57-14.919-0.689-22.387c6.806,8.818,12.396,18.141,14.861,29.107 C121.162,78.154,120.053,78.271,119.112,78.325z M100.545,66.509c0.17,4.221,0.265,8.421,0.336,12.618 c-4.745,0.154-9.488,0.225-14.233,0.269c2.246-10.477,6.813-20.702,12.56-28.418C99.494,56.578,100.377,62.302,100.545,66.509z M96.61,43.503C89.77,51.952,83.353,65.542,80.13,79.41c-4.415-0.009-8.829-0.022-13.258-0.135 C67.997,61.213,80.607,47.745,96.61,43.503z M66.947,85.07c3.944,0.571,7.903,0.912,11.869,1.166 c-1.988,13.098-0.674,25.675,6.27,33.571C74.977,111.542,68.11,96.604,66.947,85.07z M99.906,123.122 c-12.323-7.296-16.015-21.643-14.42-36.552c5.14,0.153,10.291,0.147,15.451,0.036C100.979,98.77,100.641,110.896,99.906,123.122z M147.965,86.373c-1.495,10.975-9.033,20.168-16.846,27.458c-4.882,4.554-10.379,6.219-15.945,7.712 c8.719-9.274,14.699-19.559,15.57-33.292c0.076-1.194,0.094-2.379,0.067-3.558c5.437-0.705,12.541-1.563,16.118-1.096 c0.299,0.345,0.705,0.61,1.201,0.782C148.078,85.043,148.057,85.705,147.965,86.373z"></path>
                </g>
              </g>
            </g>
          </svg>
        ) : (
          <svg
            fill="#000000"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 190.701 190.701"
            xml:space="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="M152.069,184.394c-2.659-15.571-26.047-18.899-39.647-19.344c-0.004-0.035,0.007-0.068,0.002-0.104 c-0.01-0.121-0.021-0.298-0.026-0.608c-0.022-1.076-0.112-0.805-0.218-1.845c-0.174-1.713-0.276-3.433-0.381-5.15 c-0.191-3.187-0.366-6.385-0.391-9.578c-0.008-1.064-0.342-1.87-0.849-2.455c-0.022-0.398-0.22-0.793-0.613-1.065 c-4.608-3.194-10.747-3.233-16.104-4.801c-10.406-3.045-19.686-9.057-27.932-15.941C49.276,109.611,39.908,89.097,42.929,67.42 C45.442,49.378,57.292,39.011,72.9,32.566c6.206-2.562,12.551-4.791,18.965-6.77c2.218-0.686,4.466-1.231,6.729-1.738 c3.188-0.714,4.456,0.662,3.136-0.981c1.383,1.723,4.121,0.598,4.674-1.234c0.289-0.957,0.35-1.748,0.249-2.42 c0.083-0.307,0.177-0.609,0.244-0.924c0.669-0.572,1.124-1.435,1.093-2.673c-0.104-4.072-0.509-8.159-0.588-12.254 c-0.091-4.759-7.484-4.768-7.389,0c-0.049,2.573-0.318,5.75-0.094,8.693c0.018,1.44,0.091,2.868,0.265,4.252 c-7.641,0.419-19.46,5.068-21.063,5.644c-17.42,6.245-33.175,13.408-40.181,32.115c-8.859,23.653-2.413,47.027,13.221,66.058 c8.383,10.204,33.604,30.869,50.76,28.729c-0.399,4.859-0.496,9.779-0.506,14.635c0,0.576,0.155,1.074,0.386,1.524 c-15.278,1.071-32.75,6.177-41.493,18.717c-0.087,0.053-0.185,0.078-0.271,0.133c-1.895,1.189-1.35,4.929,1.246,4.602 c5.348-0.674,72.694,6.061,84.078-1.879c0.197,0.197,0.395,0.378,0.592,0.579C149.258,189.738,152.557,187.242,152.069,184.394z"></path>
                  <path d="M155.44,74.597c-2.95-24.854-28.264-40.65-51.678-40.129C78.3,35.034,61.871,56.623,59.685,80.001 c-0.713,0.878-0.837,2.229-0.216,3.146c-0.073,1.898-0.077,3.801,0.042,5.702c1.198,19.008,21.227,44.649,42.133,43.566 c1.041,0.797,2.462,1.074,3.944,0.245c6.014-3.367,13.57-3.048,19.802-6.305c7.806-4.079,13.801-9.382,19.366-16.217 C153.03,99.972,156.985,87.62,155.44,74.597z M147.894,76.364c-5.164-0.837-11.938-0.148-17.96,0.64 c-2.764-13.567-11.678-25.686-21.896-34.906c2.476,0.031,4.976,0.227,7.489,0.709C132.334,46.037,145.565,59.972,147.894,76.364z M107.045,119.256c1.479-10.945,1.55-21.91,1.393-32.925c5.016-0.229,10.032-0.539,15.042-0.82 C124.437,99.924,116.049,109.551,107.045,119.256z M119.112,78.325c-3.608,0.208-7.202,0.364-10.797,0.521 c-0.045-2.516-0.089-5.035-0.116-7.558c-0.08-7.469-0.57-14.919-0.689-22.387c6.806,8.818,12.396,18.141,14.861,29.107 C121.162,78.154,120.053,78.271,119.112,78.325z M100.545,66.509c0.17,4.221,0.265,8.421,0.336,12.618 c-4.745,0.154-9.488,0.225-14.233,0.269c2.246-10.477,6.813-20.702,12.56-28.418C99.494,56.578,100.377,62.302,100.545,66.509z M96.61,43.503C89.77,51.952,83.353,65.542,80.13,79.41c-4.415-0.009-8.829-0.022-13.258-0.135 C67.997,61.213,80.607,47.745,96.61,43.503z M66.947,85.07c3.944,0.571,7.903,0.912,11.869,1.166 c-1.988,13.098-0.674,25.675,6.27,33.571C74.977,111.542,68.11,96.604,66.947,85.07z M99.906,123.122 c-12.323-7.296-16.015-21.643-14.42-36.552c5.14,0.153,10.291,0.147,15.451,0.036C100.979,98.77,100.641,110.896,99.906,123.122z M147.965,86.373c-1.495,10.975-9.033,20.168-16.846,27.458c-4.882,4.554-10.379,6.219-15.945,7.712 c8.719-9.274,14.699-19.559,15.57-33.292c0.076-1.194,0.094-2.379,0.067-3.558c5.437-0.705,12.541-1.563,16.118-1.096 c0.299,0.345,0.705,0.61,1.201,0.782C148.078,85.043,148.057,85.705,147.965,86.373z"></path>
                </g>
              </g>
            </g>
          </svg>
        )}
      </button>
      <div className="absolute hidden group-hover:block bg-white dark:bg-[#101010] shadow-lg rounded">
        <p
          onClick={() => {
            let language = "en";
            let elementGoogle = document.getElementById(
              "google_translate_element"
            );
            elementGoogle.getElementsByTagName("select")[0].value = language;
            elementGoogle
              .getElementsByTagName("select")[0]
              .dispatchEvent(new Event("change"));
            document.getElementById(":1.container").style.transform =
              "scale(0)";
            document.getElementById(
              "google_translate_element"
            ).style.transform = "scale(0)";
          }}
          className="px-4 py-2 border-b border-[rgba(166,166,166,0.3)] hover:tracking-[1px] dark:text-white  text-black cursor-pointer text-sm font-medium"
        >
          English
        </p>
        <p
          onClick={() => {
            let language = "fr";
            let elementGoogle = document.getElementById(
              "google_translate_element"
            );
            elementGoogle.getElementsByTagName("select")[0].value = language;
            elementGoogle
              .getElementsByTagName("select")[0]
              .dispatchEvent(new Event("change"));
            document.getElementById(":1.container").style.transform =
              "scale(0)";
            document.getElementById(
              "google_translate_element"
            ).style.transform = "scale(0)";
          }}
          className="px-4 py-2 border-b border-[rgba(166,166,166,0.3)] hover:tracking-[1px]  dark:text-white text-black cursor-pointer text-sm font-medium"
        >
          French
        </p>
        <p
          onClick={() => {
            let language = "zh-CN";
            let elementGoogle = document.getElementById(
              "google_translate_element"
            );
            elementGoogle.getElementsByTagName("select")[0].value = language;
            elementGoogle
              .getElementsByTagName("select")[0]
              .dispatchEvent(new Event("change"));
            document.getElementById(":1.container").style.transform =
              "scale(0)";
            document.getElementById(
              "google_translate_element"
            ).style.transform = "scale(0)";
          }}
          className="px-4 py-2 border-b border-[rgba(166,166,166,0.3)] hover:tracking-[1px]  dark:text-white text-black cursor-pointer text-sm font-medium"
        >
          Chinese
        </p>
        <p
          onClick={() => {
            let language = "ar";
            let elementGoogle = document.getElementById(
              "google_translate_element"
            );
            elementGoogle.getElementsByTagName("select")[0].value = language;
            elementGoogle
              .getElementsByTagName("select")[0]
              .dispatchEvent(new Event("change"));
            document.getElementById(":1.container").style.transform =
              "scale(0)";
            document.getElementById(
              "google_translate_element"
            ).style.transform = "scale(0)";
          }}
          className="px-4 py-2 border-b border-[rgba(166,166,166,0.3)] hover:tracking-[1px]  dark:text-white text-black cursor-pointer text-sm font-medium"
        >
          Arabic
        </p>
      </div>
    </div>
  );
};

export default Lang;
