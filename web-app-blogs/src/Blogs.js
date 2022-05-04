import React, { useState, useEffect } from "react";
import {arrBlogs} from './Constant';
import {
  Link
} from "react-router-dom";
import axios from "axios";
import "./App.css";

const defaultData = [
  {
     "source":{
        "id":"the-washington-post",
        "name":"The Washington Post"
     },
     "author":"Julie Novkov",
     "title":"You’ve seen the leaked opinion overturning Roe. Here’s what comes next.",
     "description":"Opinions have been leaked before, but this one is different.",
     "url":"https://www.washingtonpost.com/politics/2022/05/03/overturning-roe-what-to-know/",
     "urlToImage":"https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/TKPNHTGK7YI6ZN7OOTYJ3AT4UY.jpg&w=1440",
     "publishedAt":"2022-05-03T18:07:16Z",
     "content":"Placeholder while article actions load\r\nPoliticos release Monday of a draft Supreme Court opinion penned by Justice Samuel Alito, has shocked advocates for and against abortion rights. The draft opin… [+6733 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"Toynewsi.com"
     },
     "author":"toynewsi.com",
     "title":"McFaralne Toys Infinite Frontier DC Multiverse Grifter Figure In-Hand Images",
     "description":"McFaralne Toys Infinite Frontier DC Multiverse Grifter Figure In-Hand Images",
     "url":"https://toynewsi.com/news.php?itemid=42661",
     "urlToImage":null,
     "publishedAt":"2022-05-03T18:06:52Z",
     "content":"JayC - 2022-05-03 @ 6:03 pm\r\nShown below via JediBatman is a in-hand look at the new Infinite Frontier DC Multiverse Grifter figure from McFarlane Toys. Note the guns shown with the figure are not in… [+1689 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"Phys.Org"
     },
     "author":"Science X staff",
     "title":"Blood clot expert working with NASA to study blood flow, clot formation in zero gravity",
     "description":"Are astronauts more likely to develop blood clots during space missions due to zero gravity? That's the question NASA is trying to answer with help from UNC School of Medicine's Stephan Moll, MD, professor in the UNC Department of Medicine. A new publication …",
     "url":"https://phys.org/news/2022-05-blood-clot-expert-nasa-formation.html",
     "urlToImage":"https://scx2.b-cdn.net/gfx/news/2022/unc-blood-clot-expert.jpg",
     "publishedAt":"2022-05-03T18:04:21Z",
     "content":"Are astronauts more likely to develop blood clots during space missions due to zero gravity? That's the question NASA is trying to answer with help from UNC School of Medicine's Stephan Moll, MD, pro… [+4755 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"Daily Mail"
     },
     "author":"Will Griffee",
     "title":"Justin Gaethje has become UFC most dependable star ahead of Charles Oliveira title clash at UFC 274",
     "description":"Justin Gaethje has stepped into the UFC's octagon nine times and banked a $50,000 performance bonus in eight of them. 'The Highlight' is about as apt a moniker as possible.",
     "url":"https://www.dailymail.co.uk/sport/mma/article-10777749/Justin-Gaethje-UFC-dependable-star-ahead-Charles-Oliveira-title-clash-UFC-274.html",
     "urlToImage":"https://i.dailymail.co.uk/1s/2022/05/03/11/57347541-0-image-a-2_1651573520342.jpg",
     "publishedAt":"2022-05-03T18:00:46Z",
     "content":"Justin Gaethje has stepped into the UFC's octagon nine times and banked a $50,000 performance bonus in eight of them. \r\n'The Highlight' is about as apt a moniker as the American could have and firewo… [+5147 chars]"
  },
  {
     "source":{
        "id":"the-irish-times",
        "name":"The Irish Times"
     },
     "author":"Stephen Maguire",
     "title":"Donegal crash victim an ‘ordinary man with great attitude’",
     "description":"Father-of-two from Malin Head died following two-car collision on Monday evening",
     "url":"https://www.irishtimes.com/news/ireland/irish-news/donegal-crash-victim-an-ordinary-man-with-great-attitude-1.4868557",
     "urlToImage":"https://www.irishtimes.com/image-creator/?id=1.4868556&origw=1440",
     "publishedAt":"2022-05-03T17:56:46Z",
     "content":"A man killed in a two-car collision on a remote Donegal road has been described as a down to earth fella who always had a smile on his face.\r\nJim Kenny (42), a father-of-two from Malin Head, died ins… [+1038 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"The Guardian"
     },
     "author":"Jessica Murray and agency",
     "title":"Nezam Salangy found guilty of murdering and burying his wife",
     "description":"Salangy’s brothers were also convicted alongside him of helping to cover up the murder of Zobaidah SalangyA pizza shop owner has been convicted of murdering his wife and burying her body in an unmarked grave that went undiscovered by police for more than six …",
     "url":"https://amp.theguardian.com/uk-news/2022/may/03/nezam-salangy-found-guilty-of-murdering-and-burying-his-wife",
     "urlToImage":"https://i.guim.co.uk/img/media/c4bbcb821302b8a63637ede06ac8ebe4d8176154/6_696_1493_896/master/1493.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=6912994920e5ba8f5a4d2dbcddd2a60d",
     "publishedAt":"2022-05-03T17:53:33Z",
     "content":"A pizza shop owner has been convicted of murdering his wife and burying her body in an unmarked grave that went undiscovered by police for more than six months despite extensive searches.\r\nNezam Sala… [+2991 chars]"
  },
  {
     "source":{
        "id":"news24",
        "name":"News24"
     },
     "author":"Neil Thomas Stacey",
     "title":"News24.com | ANALYSIS | Switch to electric cars? Not so fast, SA - ditch coal first",
     "description":"In the South African context, electric cars are currently the dirtiest means of personal transport available, and will remain so until we have fixed our electricity generation.",
     "url":"https://www.news24.com/fin24/Opinion/analysis-switch-to-electric-cars-not-so-fast-sa-ditch-coal-first-20220503",
     "urlToImage":"https://cdn.24.co.za/files/Cms/General/d/11035/4fd2cc2399e44d658170c6220c1482f4.jpg",
     "publishedAt":"2022-05-03T17:51:18Z",
     "content":"Some 90% of South Africa’s electricity is produced by outdated, low efficiency coal-fired power stations. For now, public transport is the better option - but that needs work too, writes Neil Thomas … [+12804 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"Vanity Fair"
     },
     "author":"Emily Kirkpatrick",
     "title":"Dove Cameron's Iris Van Herpen Gown Gives a “Futuristic Take on the Gilded Age” at the 2022 Met Gala",
     "description":"Dove Cameron's Iris Van Herpen gown gave a “futuristic take on the Gilded Age” for her first time attending the 2022 Met Gala, choosing a dress that made her “feel feminine, divine, and very much like myself.”",
     "url":"https://www.vanityfair.com/style/2022/05/dove-cameron-2022-met-gala-iris-van-herpen-red-carpet-prep-inspiration-gilded-glamour",
     "urlToImage":"https://media.vanityfair.com/photos/62716ab8f0f4133d33c0ce86/16:9/w_1280,c_limit/Dove-Cameron-Getting-Ready-Met-Gala-Site-Story-Image.jpg",
     "publishedAt":"2022-05-03T17:51:04Z",
     "content":"Dove Cameron went bold for her debut on the Met Gala red carpet, wearing an otherworldly interpretation of gilded glamour.\r\nThe actress attended fashion's biggest night in a skeletal Iris van Herpen … [+2154 chars]"
  },
  {
     "source":{
        "id":"bbc-news",
        "name":"BBC News"
     },
     "author":"https://www.facebook.com/bbcnews",
     "title":"Jealous father killed son to hurt mother, jury told",
     "description":"Lukasz Czapla denies murdering two-year-old Julius in Muirhouse, Edinburgh, in November 2020.",
     "url":"https://www.bbc.co.uk/news/uk-scotland-edinburgh-east-fife-61311169",
     "urlToImage":"https://ichef.bbci.co.uk/news/1024/branded_news/26D2/production/_124283990__115631881_julias.jpg",
     "publishedAt":"2022-05-03T17:50:55Z",
     "content":"Image source, Police Scotland\r\nImage caption, Lukasz Czapla is accused of murdering his son Julius in November 2020\r\nA man who allegedly murdered his young son was motivated by jealousy towards the c… [+3946 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"Toronto Star"
     },
     "author":"Alex McKeen - Vancouver Bureau",
     "title":"With Roe v. Wade set to fall, this doctor’s clinic and others like it may emerge as America’s safe havens for abortion",
     "description":"As the sun sets on abortion rights held up by Roe v. Wade, it’s a patchwork of determined medical providers who are holding up abortion rights for the U.S.",
     "url":"https://www.thestar.com/news/canada/2022/02/22/with-roe-v-wade-set-to-fall-this-doctors-clinic-and-others-like-it-may-emerge-as-americas-safe-havens-for-abortion.html",
     "urlToImage":"https://images.thestar.com/Q2LpMic_LDIGT4yKw-vE3x6ppV0=/1200x786/smart/filters:cb(1651600453292)/https://www.thestar.com/content/dam/thestar/news/canada/2022/02/22/with-roe-v-wade-set-to-fall-this-doctors-clinic-and-others-like-it-may-emerge-as-americas-safe-havens-for-abortion/_main.jpg",
     "publishedAt":"2022-05-03T17:49:00Z",
     "content":"BOULDER, Colo.—Inside this small medical recovery room, little has changed over the decades, even as a political war has raged about its very existence.\r\nWhile protesters shouted outside, its two nea… [+15325 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"CNET"
     },
     "author":"Amanda Kooser",
     "title":"Deep Breath: Asteroid 2009 JF1 Won't Smack Into Earth on May 6",
     "description":"The asteroid's path had been mysterious, but scientists have it sorted out.",
     "url":"https://www.cnet.com/science/space/deep-breath-asteroid-2009-jf1-wont-smack-into-earth-on-may-6/",
     "urlToImage":"https://www.cnet.com/a/img/resize/6f583cbbc21b5625f8be0940bc46601f03ba47ea/2020/09/21/d044f9f6-d4b0-4996-997c-9fe52b0f616e/nasaasteroidillustration.jpg?auto=webp&fit=crop&height=630&width=1200",
     "publishedAt":"2022-05-03T17:44:53Z",
     "content":"I was cruising through the Google News science section this morning when a story popped out saying NASA has estimated a space rock the size of the Great Pyramid may hit our planet on May 6, and even … [+2472 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"Foreign Policy"
     },
     "author":"Raffaello Pantucci and Ajmal Waziri",
     "title":"China Wants Its Investments in Afghanistan to Be Safer Than in Pakistan",
     "description":"Beijing could profit handsomely from Afghan resources and exports, but new ventures risk exposing Chinese nationals to violence.",
     "url":"https://foreignpolicy.com/2022/05/03/china-investment-afghanistan-pakistan-security/",
     "urlToImage":"https://foreignpolicy.com/wp-content/uploads/2022/05/china-afghanistan-copper.jpg?w=1000",
     "publishedAt":"2022-05-03T17:41:40Z",
     "content":"On April 26, a suicide bomber killed Huang Guiping, the director of the Confucius Institute at the University of Karachi, as well as two Chinese teachers and a Pakistani driver. The attack, claimed b… [+12181 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"Rlsbb.ru"
     },
     "author":"Kingman",
     "title":"Various Artists - Best of Rock 1978",
     "description":"Tracklist:01. The Who - Who Are You02. Queen - Don't Stop Me Now03. Van Halen - Runnin' with the Devil (2015 Remaster)04. The Police - Roxanne (Remastered 2003)05. Toto - Hold the Line06. The Rolling Stones - Beast Of Burden (Remastered 1994)07. Blondie - One…",
     "url":"https://comment.rlsbb.ru/various-artists-best-of-rock-1978/",
     "urlToImage":null,
     "publishedAt":"2022-05-03T17:39:22Z",
     "content":"Tracklist:01. The Who – Who Are You02. Queen – Don’t Stop Me Now03. Van Halen – Runnin’ with the Devil (2015 Remaster)04. The Police – Roxanne (Remastered 2003)05. Toto – Hold the Line06. The Rolling… [+2806 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"Rlsbb.ru"
     },
     "author":"Kingman",
     "title":"Various Artists - Best of Rock 1976",
     "description":"Tracklist:01. Eagles - Hotel California (2013 Remaster)02. Queen - Somebody To Love03. Thin Lizzy - The Boys Are Back In Town04. Boston - More Than a Feeling05. Tom Petty And The Heartbreakers - American Girl06. Bob Seger & The Silver Bullet Band - Night Move…",
     "url":"https://comment.rlsbb.ru/various-artists-best-of-rock-1976/",
     "urlToImage":null,
     "publishedAt":"2022-05-03T17:39:22Z",
     "content":"Tracklist:01. Eagles – Hotel California (2013 Remaster)02. Queen – Somebody To Love03. Thin Lizzy – The Boys Are Back In Town04. Boston – More Than a Feeling05. Tom Petty And The Heartbreakers – Amer… [+2420 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"Babajiji.com"
     },
     "author":"Yuri Nomura",
     "title":"Disregard Bumble or Grindr, Korea is old-school rather than thus vanguard about west apps",
     "description":"Disregard Bumble or Grindr, Korea is old-school rather than thus vanguard about west apps Ya ya ya, your read […]",
     "url":"http://www.babajiji.com/93147",
     "urlToImage":null,
     "publishedAt":"2022-05-03T17:39:11Z",
     "content":"Yuri Nomura | 2022.05.04 \r\nDisregard Bumble or Grindr, Korea is old-school rather than thus vanguard about west apps\r\nYa ya ya, your read that right. Tinder. In a foreign nation, Tinder is more than … [+5317 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"Toynewsi.com"
     },
     "author":"toynewsi.com",
     "title":"Sponsor News: New Power Rangers Action Figures at Entertainment Earth",
     "description":"Sponsor News: New Power Rangers Action Figures at Entertainment Earth",
     "url":"https://toynewsi.com/news.php?itemid=42659",
     "urlToImage":null,
     "publishedAt":"2022-05-03T17:37:50Z",
     "content":"Entertainment News International (ENI) is the #1 popular culture network for adult fans all around the world.Get the scoop on all the popular comics, games, movies, toys, and more every day!\r\nContact… [+715 chars]"
  },
  {
     "source":{
        "id":"abc-news",
        "name":"ABC News"
     },
     "author":"Krystal Rhaburn",
     "title":"Disneyland Resort and Make-A-Wish Fulfill First Official In-Park Wishes Since Reopening",
     "description":"This World Wish Day, we announced that the Disneyland Resort Wish Program is returning after a two-year hiatus! Since the very first official wish was granted at Disneyland Resort in 1980, Disney and Make-A-Wish have worked together to make more than 145,000 …",
     "url":"https://disneyparks.disney.go.com/blog/2022/05/disneyland-resort-and-make-a-wish-fulfill-first-official-in-park-wishes-since-reopening/",
     "urlToImage":"https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2022/05/ghjoi9t8yt4ughewjaksl.png",
     "publishedAt":"2022-05-03T17:35:29Z",
     "content":"This World Wish Day, we announced that the Disneyland Resort Wish Program is returning after a two-year hiatus! Since the very first official wish was granted at Disneyland Resort in 1980, Disney and… [+2869 chars]"
  },
  {
     "source":{
        "id":"the-times-of-india",
        "name":"The Times of India"
     },
     "author":null,
     "title":"सूर्य पर भयानक विस्फोट से निकली बेहद शक्तिशाली सोलर फ्लेयर, धरती के लिए खतरा?",
     "description":"Solar Flare Threat to Earth : सूर्य पर हालिया विस्फोट से जो सौर लहर निकली वह मध्य-अटलांटिक महासागर और यूरोप के अधिकांश हिस्सों में एक मजबूत ब्लैकआउट को अंजाम देने के लिए पर्याप्त थी।",
     "url":"https://navbharattimes.indiatimes.com/world/science-news/massive-eruption-on-sun-shoots-powerful-solar-flare-know-with-it-hit-on-earth/articleshow/91294062.cms",
     "urlToImage":"https://navbharattimes.indiatimes.com/photo/msid-91294062,imgsize-33382/pic.jpg",
     "publishedAt":"2022-05-03T17:33:14Z",
     "content":": 30 AR2994 \r\n X1.1- X X M \r\n10 National Oceanic and Atmospheric Administration X1.1- 7:07 10 \r\n ? 2022 - , -"
  },
  {
     "source":{
        "id":null,
        "name":"The Guardian"
     },
     "author":"Josh Butler",
     "title":"In Hunter, where coal is king, a Labor heartland seat faces a strong Coalition challenge",
     "description":"The ALP has held the NSW electorate at every election since 1910. But with seismic changes under way, the valley’s miners are eyeing the future with unease<ul><li>Anywhere but Canberra: seat profiles</li><li>Read our latest election briefing and listen to tod…",
     "url":"https://amp.theguardian.com/australia-news/2022/may/04/in-hunter-where-coal-is-king-a-labor-heartland-seat-faces-a-strong-coalition-challenge",
     "urlToImage":"https://i.guim.co.uk/img/media/018db9a73cc81ade4027068b91cca60cf2a22b5f/10_535_8148_4891/master/8148.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=c203da5dcd7092a6bcf5c1fa565440e1",
     "publishedAt":"2022-05-03T17:30:45Z",
     "content":"If theres one place in the nation where the rubber hits the road on Australias decades-long discussion about the climate crisis, fossil fuels, mining and jobs its the seat of Hunter. The coal-rich el… [+11363 chars]"
  },
  {
     "source":{
        "id":null,
        "name":"Tech Xplore"
     },
     "author":"Science X staff",
     "title":"Timing, among other factors, improves aging in next-generation wireless communications",
     "description":"In wireless communications, channels can not only change, but they can also age. For contemporary systems, these connections between the transmitter and the receiver break down over time, user movement and power dissipation. Understanding how channels age in …",
     "url":"https://techxplore.com/news/2022-05-factors-aging-next-generation-wireless.html",
     "urlToImage":"https://scx2.b-cdn.net/gfx/news/hires/2022/timing-among-other-fac.jpg",
     "publishedAt":"2022-05-03T17:28:54Z",
     "content":"In wireless communications, channels can not only change, but they can also age. For contemporary systems, these connections between the transmitter and the receiver break down over time, user moveme… [+4674 chars]"
  }
]
function App() {
  const [key, setKey] = useState('earth');
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://newsapi.org/v2/everything?q=${key}&from=2022-04-03&sortBy=publishedAt&apiKey=f8fbc670f1a34eb485adb31cb65d8911`)
      .then((response) => setData(response?.data?.articles || defaultData))
      .catch(() => setData(defaultData));
  }, [key])

  return (
    <div className="container mt-5">
      <input onChange={(e) => setKey(e.target.value || 'earth')} />

      <div className="row mt-5">
      {
        data.map((blog, index) => {
          return (
            <div className="mt-4">
              <div className="card" style={{flexDirection: "row"}}>
                  <div class="card-body">
                    <h5 class="card-title">{`#${index + 1}`}</h5>
                    <p class="card-text">{blog.title}</p>
                    <p class="card-text">{blog.description}</p>
                  </div>

                  <img className="img" src={blog.urlToImage} />
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  );
}

export default App;
