import React,{useState, useEffect} from "react";
//import video from 'assets/v1.mp4'
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import './index.scss'

import Hero from "components/Hero";
import Demo from "components/Demo";

import VideoPlayer from "react-background-video-player";
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/v4.mp4";
import { loader } from "assets";
import beamster from "assets/img/auth/BeamsterLogin.png"
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useAuth } from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";
import { useLazyGetSummaryQuery } from "../../../services/article";
function OnBoarding() {
  const [email, setEmail] = useState("");  // <-- Default values HERE
  const [password, setPassword] = useState("");       // <-- Default values HERE
  const [error, setError] = useState(undefined);
  const [buttonText, setButtonText] = useState("Sign in");
  const history = useHistory();
  const { setUser } = useAuth();
  const { user } = useAuth();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const login = async (event) => {
    if (event) {
      event.preventDefault();
    }
    // if (user && user.token) {
      return history.push("/admin/dashboards");
    // }
    if (email === "") {
      return setError("You must enter your email.");
    }
    if (password === "") {
      return setError("You must enter your password");
    }
    setButtonText("Signing in");
    try {
      let response = await AuthApi.Login({
        email,
        password,
      });
      if (response.data && response.data.success === false) {
        setButtonText("Sign in");
        return setError(response.data.msg);
      }
      return setProfile(response);
    } catch (err) {
      console.log(err);
      setButtonText("Sign in");
      if (err.message) {
        return setError(err.message);
      }
      return setError("There has been an error.");
    }
  };
  const setProfile = async (response) => {
    let user = { ...response.data.user };
    user.token = response.data.token;
    user = JSON.stringify(user);
    setUser(user);
    localStorage.setItem("user", user);
    return history.push("/dashboards");
  };


  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  // RTK lazy query
  const [getSummary, { errors, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  function limitWords(inputString, limit, placeholder = "..") {
    // Split the input string into an array of words
    const words = inputString.split(/\s+/);
  
    // Check if the number of words exceeds the limit
    if (words.length <= limit) {
      // If not, return the original string
      return inputString;
    } else {
      // If it exceeds the limit, join the first 'limit' words and add the placeholder
      return words.slice(0, limit).join(" ") + " " + placeholder;
    }
  }

  return (<>


         <VideoPlayer
          className="video"
          src={
            illustration
          }
          autoPlay={true}
        //   muted={true}
          style={{width:'50%'}}
        /> 

        <div class="wrap">
	<div class="head">
	

		
	</div>
	<div class="body">
		<div class="left">
			<figure class="s-message">
				{/* <figcaption><span>Alexandr</span>12:35
					<div class="dot"></div>
				</figcaption> */}
				<p>Hi, Please enter yours website Link)</p>
			</figure>
		</div>

		<div class="right">
			<figure class="u-message">
				{/* <figcaption>
					<div class="dot_green"></div><span>Me</span>12:36</figcaption> */}
				<p>  
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                 <span className='blue_gradient'>Your product Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                {limitWords(article.summary, 60)}
                  {/* { article.summary.length>60 ? article.summary.slice(0, 60).join(" ") + " ...":article.summary} */}
                </p>
              </div>
            </div>
          )
        )}
      </p>
			</figure>
		</div>
        
	</div>
	<div className="footer">
			<div className="sending-message">
				<button
                 onClick={handleSubmit}>SEND<svg id="send-ico"	 viewBox="0 0 26.5 22.9">
                <polygon points="5.8,0 26.5,12.4 5.3,22.9 6.6,14.8 0,10.4 11.3,10.4 6.4,7.7 "/>
                </svg>
                </button>
				<textarea type="text" className="message-input" 
                  value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
                placeholder="Type message..."></textarea>
			</div>
		
	</div>
	<div classNames="line"></div>
</div>
   
</>  );
}

export default OnBoarding;
