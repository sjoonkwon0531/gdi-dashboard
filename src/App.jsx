import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell, ScatterChart, Scatter, ZAxis, Area, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ReferenceLine } from "recharts";

// ═══ CORE DATA ═══
const R=[{c:"USA",n:"United States",s:52.12,f:61.09,C:99.3,E:61.34,e:.85,g:29900,p:340},{c:"CHN",n:"China",s:37.92,f:41.46,C:56.54,E:74.41,e:.70,g:19500,p:1412},{c:"KOR",n:"South Korea",s:27.04,f:28.79,C:45.19,E:53.54,e:.82,g:1850,p:52},{c:"GBR",n:"United Kingdom",s:23.52,f:25.18,C:37.14,E:44.88,e:.80,g:3500,p:68},{c:"JPN",n:"Japan",s:21.23,f:23.51,C:34.79,E:48.90,e:.75,g:4400,p:124},{c:"FRA",n:"France",s:19.06,f:21.18,C:33.88,E:48.66,e:.72,g:3150,p:68},{c:"DEU",n:"Germany",s:15.96,f:18.36,C:25.01,E:54.08,e:.78,g:4600,p:84},{c:"ISR",n:"Israel",s:17.40,f:17.83,C:33.35,E:35.34,e:.85,g:560,p:10},{c:"ARE",n:"UAE",s:16.18,f:16.34,C:48.07,E:49.15,e:.55,g:550,p:10},{c:"CAN",n:"Canada",s:14.21,f:16.23,C:26.35,E:49.30,e:.72,g:2250,p:40},{c:"SGP",n:"Singapore",s:15.54,f:15.72,C:31.83,E:31.14,e:.82,g:530,p:6},{c:"NLD",n:"Netherlands",s:13.02,f:14.87,C:24.41,E:45.52,e:.78,g:1150,p:18},{c:"TWN",n:"Taiwan",s:14.33,f:14.67,C:33.86,E:35.86,e:.65,g:820,p:24},{c:"CHE",n:"Switzerland",s:10.72,f:12.39,C:19.66,E:50.82,e:.82,g:950,p:9},{c:"SWE",n:"Sweden",s:10.45,f:12.08,C:20.89,E:54.50,e:.80,g:630,p:10},{c:"IND",n:"India",s:9.68,f:10.74,C:24.06,E:34.33,e:.50,g:4000,p:1450},{c:"SAU",n:"Saudi Arabia",s:10.36,f:11.09,C:36.30,E:43.90,e:.42,g:1100,p:37},{c:"FIN",n:"Finland",s:8.91,f:10.28,C:20.46,E:48.30,e:.78,g:315,p:6},{c:"AUS",n:"Australia",s:8.86,f:10.25,C:17.91,E:51.17,e:.68,g:1800,p:26}];

const SN={USA:{cm:98,ci:100,eg:82,et:70,es:65,mix:{solar:.06,wind:.12,nuclear:.18,gas:.42,coal:.16,hydro:.05},lcoe:.055,semi:45,gpu:100},CHN:{cm:88,ci:72,eg:92,et:78,es:75,mix:{solar:.10,wind:.12,nuclear:.05,gas:.03,coal:.58,hydro:.11},lcoe:.042,semi:30,gpu:55},KOR:{cm:55,ci:42,eg:62,et:82,es:55,mix:{solar:.06,wind:.02,nuclear:.30,gas:.30,coal:.28,hydro:.01},lcoe:.058,semi:85,gpu:95},DEU:{cm:45,ci:15,eg:65,et:75,es:60,mix:{solar:.13,wind:.28,nuclear:0,gas:.14,coal:.25,hydro:.03},lcoe:.068,semi:15,gpu:95},IND:{cm:42,ci:18,eg:55,et:45,es:30,mix:{solar:.10,wind:.05,nuclear:.03,gas:.05,coal:.72,hydro:.04},lcoe:.048,semi:8,gpu:80},TWN:{cm:35,ci:35,eg:48,et:75,es:30,mix:{solar:.05,wind:.03,nuclear:.08,gas:.42,coal:.38,hydro:.02},lcoe:.062,semi:98,gpu:95}};

const TS={USA:[{y:1995,f:1.08},{y:2000,f:1.21},{y:2005,f:2.23},{y:2010,f:2.66},{y:2015,f:6.87},{y:2020,f:29.16},{y:2025,f:61.09},{y:2028,f:84.3,lo:83.8,hi:84.8},{y:2030,f:88.1,lo:87.0,hi:89.2},{y:2034,f:92.5,lo:89.5,hi:95.6},{y:2036,f:99.3,lo:94.7,hi:103.9},{y:2040,f:113.9,lo:105.4,hi:123.5},{y:2046,f:135.5,lo:113.4,hi:157.9}],CHN:[{y:1995,f:.32},{y:2000,f:.36},{y:2005,f:.75},{y:2010,f:.99},{y:2015,f:3.08},{y:2020,f:17.51},{y:2025,f:41.46},{y:2028,f:57.6,lo:57.2,hi:58.0},{y:2030,f:63.7,lo:63.0,hi:64.4},{y:2034,f:81.0,lo:78.0,hi:83.2},{y:2036,f:94.5,lo:87.4,hi:99.1},{y:2040,f:120.6,lo:102.9,hi:138.2},{y:2046,f:161.8,lo:119.1,hi:182.7}],KOR:[{y:1995,f:0.31},{y:2000,f:0.34},{y:2005,f:0.67},{y:2010,f:0.81},{y:2015,f:2.29},{y:2020,f:12.61},{y:2025,f:28.79},{y:2028,f:39.0,lo:38.7,hi:39.3},{y:2030,f:42.5,lo:41.9,hi:43.1},{y:2034,f:51.5,lo:48.9,hi:53.4},{y:2036,f:57.4,lo:52.5,hi:61.6},{y:2040,f:67.1,lo:56.7,hi:78.1},{y:2046,f:77.5,lo:57.3,hi:102.8}],JPN:[{y:1995,f:0.28},{y:2000,f:0.3},{y:2005,f:0.56},{y:2010,f:0.67},{y:2015,f:1.85},{y:2020,f:10.38},{y:2025,f:23.51},{y:2028,f:32.5,lo:32.2,hi:32.8},{y:2030,f:35.7,lo:35.2,hi:36.2},{y:2034,f:43.8,lo:40.7,hi:45.7},{y:2036,f:48.1,lo:43.1,hi:52.5},{y:2040,f:53.5,lo:44.4,hi:64.1},{y:2046,f:57.1,lo:40.9,hi:77.2}],DEU:[{y:2000,f:.17},{y:2010,f:.42},{y:2015,f:1.3},{y:2020,f:7.57},{y:2025,f:18.36},{y:2028,f:27.5,lo:27.3,hi:27.7},{y:2030,f:30.7,lo:30.3,hi:31.1},{y:2034,f:39.9,lo:36.8,hi:41.6},{y:2036,f:44.2,lo:39.0,hi:48.7},{y:2040,f:48.9,lo:40.1,hi:58.8},{y:2046,f:50.7,lo:35.6,hi:69.1}],FRA:[{y:1995,f:0.21},{y:2000,f:0.22},{y:2005,f:0.44},{y:2010,f:0.53},{y:2015,f:1.57},{y:2020,f:8.92},{y:2025,f:21.18},{y:2028,f:29.4,lo:29.2,hi:29.7},{y:2030,f:32.4,lo:31.9,hi:32.8},{y:2034,f:40.0,lo:37.4,hi:41.6},{y:2036,f:43.9,lo:39.8,hi:48.0},{y:2040,f:49.6,lo:41.5,hi:58.5},{y:2046,f:54.0,lo:39.3,hi:72.8}],GBR:[{y:1995,f:0.25},{y:2000,f:0.27},{y:2005,f:0.56},{y:2010,f:0.64},{y:2015,f:1.96},{y:2020,f:10.69},{y:2025,f:25.18},{y:2028,f:34.3,lo:34.0,hi:34.5},{y:2030,f:37.4,lo:36.9,hi:37.9},{y:2034,f:45.7,lo:43.1,hi:47.5},{y:2036,f:50.7,lo:45.9,hi:54.9},{y:2040,f:58.5,lo:48.9,hi:68.6},{y:2046,f:65.6,lo:47.9,hi:86.9}],IND:[{y:1995,f:.08},{y:2005,f:.19},{y:2015,f:.76},{y:2020,f:4.40},{y:2025,f:10.74},{y:2028,f:15.3,lo:15.2,hi:15.4},{y:2030,f:17.2,lo:17.0,hi:17.4},{y:2034,f:22.9,lo:22.3,hi:23.6},{y:2036,f:27.6,lo:26.2,hi:28.7},{y:2040,f:38.9,lo:33.8,hi:42.3},{y:2046,f:53.4,lo:46.3,hi:55.4}],EU:[{y:1995,f:0.19},{y:2000,f:0.20},{y:2005,f:0.42},{y:2010,f:0.49},{y:2015,f:1.48},{y:2020,f:8.38},{y:2025,f:20.03},{y:2028,f:28.5,lo:28.3,hi:28.7},{y:2030,f:31.5,lo:31.1,hi:31.9},{y:2034,f:39.7,lo:37.0,hi:41.4},{y:2036,f:44.0,lo:39.4,hi:48.1},{y:2040,f:49.6,lo:41.1,hi:59.1},{y:2046,f:53.6,lo:38.4,hi:72.3}],TWN:[{y:1995,f:0.17},{y:2000,f:0.2},{y:2005,f:0.36},{y:2010,f:0.44},{y:2015,f:1.2},{y:2020,f:6.52},{y:2025,f:14.67},{y:2028,f:19.7,lo:19.5,hi:19.9},{y:2030,f:21.5,lo:21.1,hi:21.8},{y:2034,f:26.1,lo:24.8,hi:27.1},{y:2036,f:29.3,lo:27.0,hi:31.3},{y:2040,f:35.1,lo:30.0,hi:40.2},{y:2046,f:43.1,lo:32.5,hi:56.0}],VNM:[{y:1995,f:0.01},{y:2000,f:0.01},{y:2005,f:0.03},{y:2010,f:0.04},{y:2015,f:0.14},{y:2020,f:0.85},{y:2025,f:2.22},{y:2028,f:3.5,lo:3.5,hi:3.6},{y:2030,f:4.2,lo:4.1,hi:4.2},{y:2034,f:6.2,lo:6.0,hi:6.4},{y:2036,f:7.8,lo:7.3,hi:8.2},{y:2040,f:11.5,lo:9.7,hi:12.6},{y:2046,f:15.0,lo:12.6,hi:15.8}]};

const CL={USA:"#3b82f6",CHN:"#ef4444",KOR:"#8b5cf6",GBR:"#06b6d4",JPN:"#f97316",DEU:"#22c55e",FRA:"#a855f7",IND:"#eab308",ARE:"#64748b",TWN:"#ec4899",CAN:"#14b8a6",SGP:"#7c3aed",ISR:"#0ea5e9",NLD:"#f59e0b",SAU:"#84cc16",CHE:"#e11d48",SWE:"#2563eb",IRL:"#10b981",FIN:"#6366f1",AUS:"#d946ef",EU:"#fbbf24",VNM:"#dc2626"};
const FL={USA:"\u{1F1FA}\u{1F1F8}",CHN:"\u{1F1E8}\u{1F1F3}",KOR:"\u{1F1F0}\u{1F1F7}",GBR:"\u{1F1EC}\u{1F1E7}",JPN:"\u{1F1EF}\u{1F1F5}",DEU:"\u{1F1E9}\u{1F1EA}",FRA:"\u{1F1EB}\u{1F1F7}",IND:"\u{1F1EE}\u{1F1F3}",ARE:"\u{1F1E6}\u{1F1EA}",TWN:"\u{1F1F9}\u{1F1FC}",CAN:"\u{1F1E8}\u{1F1E6}",SGP:"\u{1F1F8}\u{1F1EC}",ISR:"\u{1F1EE}\u{1F1F1}",NLD:"\u{1F1F3}\u{1F1F1}",SAU:"\u{1F1F8}\u{1F1E6}",CHE:"\u{1F1E8}\u{1F1ED}",SWE:"\u{1F1F8}\u{1F1EA}",FIN:"\u{1F1EB}\u{1F1EE}",AUS:"\u{1F1E6}\u{1F1FA}",EU:"\u{1F1EA}\u{1F1FA}",VNM:"\u{1F1FB}\u{1F1F3}"};

// ═══ EXTENDED DATA ═══
const GDPGDI=[{c:"USA",g:29900,f:61.09},{c:"CHN",g:19500,f:41.46},{c:"KOR",g:1850,f:28.79},{c:"GBR",g:3500,f:25.18},{c:"JPN",g:4400,f:23.51},{c:"FRA",g:3150,f:21.18},{c:"DEU",g:4600,f:18.36},{c:"ISR",g:560,f:17.83},{c:"ARE",g:550,f:16.34},{c:"CAN",g:2250,f:16.23},{c:"SGP",g:530,f:15.72},{c:"NLD",g:1150,f:14.87},{c:"TWN",g:820,f:14.67},{c:"IND",g:4000,f:10.74},{c:"SAU",g:1100,f:11.09},{c:"SWE",g:630,f:12.08},{c:"AUS",g:1800,f:10.25}];

const AICONTRIB=[{c:"USA",n:"United States",now:4.15,y30:7.48,y36:13.29,bn:1242},{c:"CHN",n:"China",now:2.32,y30:4.18,y36:7.43,bn:453},{c:"KOR",n:"South Korea",now:1.89,y30:3.40,y36:6.04,bn:35},{c:"GBR",n:"United Kingdom",now:1.61,y30:2.90,y36:5.16,bn:56},{c:"JPN",n:"Japan",now:1.41,y30:2.54,y36:4.51,bn:62},{c:"FRA",n:"France",now:1.22,y30:2.20,y36:3.90,bn:38},{c:"DEU",n:"Germany",now:1.15,y30:2.06,y36:3.67,bn:53},{c:"IND",n:"India",now:0.43,y30:0.77,y36:1.37,bn:17}];

const FEEDBACK={USA:[{y:2025,gdi:61.09,gdp:29900,ai:1242,re:621},{y:2027,gdi:59.6,gdp:32504,ai:1317,re:659},{y:2029,gdi:58.37,gdp:35302,ai:1401,re:701},{y:2031,gdi:57.37,gdp:38313,ai:1495,re:748},{y:2033,gdi:56.58,gdp:41501,ai:1595,re:798},{y:2035,gdi:55.97,gdp:44881,ai:1701,re:851}],CHN:[{y:2025,gdi:41.46,gdp:19500,ai:453,re:339},{y:2027,gdi:40.30,gdp:20709,ai:475,re:356},{y:2029,gdi:39.30,gdp:22009,ai:500,re:375},{y:2031,gdi:38.46,gdp:23408,ai:527,re:395},{y:2033,gdi:37.75,gdp:24914,ai:557,re:418},{y:2035,gdi:37.17,gdp:26536,ai:590,re:442}]};

const DISRUPTIONS=[
  {id:"sc",name:"Room-Temp Superconductor",year:2031,prob:5,icon:"\u26A1",desc:"T&D losses\u21920, compute efficiency +80%",impacts:[{c:"DEU",b:18.36,n:32.66,d:77.9},{c:"FRA",b:21.18,n:36.26,d:71.2},{c:"JPN",b:23.51,n:40.12,d:70.6},{c:"GBR",b:25.18,n:41.81,d:66.0},{c:"USA",b:61.09,n:89.14,d:45.8},{c:"CHN",b:41.46,n:58.95,d:42.2},{c:"IND",b:10.74,n:18.38,d:71.1},{c:"KOR",b:28.79,n:47.12,d:63.7}]},
  {id:"fu",name:"Commercial Fusion",year:2035,prob:8,icon:"\u2622\uFE0F",desc:"Near-zero marginal cost energy at $0.015/kWh",impacts:[{c:"USA",b:61.09,n:78.46,d:28.4},{c:"TWN",b:14.67,n:16.32,d:11.3},{c:"ARE",b:16.34,n:18.17,d:11.2},{c:"KOR",b:28.79,n:30.73,d:6.8},{c:"GBR",b:25.18,n:26.88,d:6.8},{c:"CHN",b:41.46,n:43.45,d:4.8},{c:"IND",b:10.74,n:11.80,d:9.9}]},
  {id:"ns",name:"Post-Silicon Semiconductor",year:2029,prob:15,icon:"\u{1F4A0}",desc:"5\u00D7 compute/watt; China may bypass controls",impacts:[{c:"DEU",b:18.36,n:37.55,d:104.5},{c:"FRA",b:21.18,n:32.54,d:53.6},{c:"IND",b:10.74,n:16.42,d:52.9},{c:"JPN",b:23.51,n:35.55,d:51.2},{c:"CHN",b:41.46,n:59.86,d:44.4},{c:"GBR",b:25.18,n:37.72,d:49.8},{c:"USA",b:61.09,n:63.14,d:3.3},{c:"KOR",b:28.79,n:43.45,d:50.9}]},
  {id:"sd",name:"Orbital Data Centers",year:2038,prob:3,icon:"\u{1F6F0}\uFE0F",desc:"Space solar + compute for capable nations",impacts:[{c:"IND",b:10.74,n:15.55,d:44.8},{c:"JPN",b:23.51,n:31.64,d:34.6},{c:"CHN",b:41.46,n:49.59,d:19.6},{c:"ARE",b:16.34,n:18.68,d:14.3},{c:"USA",b:61.09,n:61.88,d:1.3}]},
];

const SOVEREIGN=[
  {c:"USA",n:"United States",sov:95,base:61.09,full:61.62,partial:56.23,dep:51.92,bEta:.98,cEta:.84},
  {c:"CHN",n:"China",sov:85,base:41.46,full:42.78,partial:38.12,dep:32.68,bEta:.83,cEta:.67},
  {c:"FRA",n:"France",sov:55,base:21.18,full:23.42,partial:21.18,dep:16.74,bEta:.80,cEta:.63},
  {c:"GBR",n:"United Kingdom",sov:45,base:25.18,full:28.55,partial:25.18,dep:19.08,bEta:.87,cEta:.69},
  {c:"KOR",n:"South Korea",sov:35,base:28.79,full:33.64,partial:28.79,dep:21.50,bEta:.87,cEta:.69},
  {c:"JPN",n:"Japan",sov:30,base:23.51,full:27.96,partial:23.51,dep:17.38,bEta:.80,cEta:.61},
  {c:"DEU",n:"Germany",sov:20,base:18.36,full:22.54,partial:18.36,dep:13.05,bEta:.81,cEta:.62},
  {c:"IND",n:"India",sov:25,base:10.74,full:12.62,partial:10.74,dep:7.97,bEta:.54,cEta:.35},
  {c:"ARE",n:"UAE",sov:40,base:16.34,full:18.05,partial:16.34,dep:12.60,bEta:.61,cEta:.43},
  {c:"TWN",n:"Taiwan",sov:15,base:14.67,full:18.55,partial:14.67,dep:9.55,bEta:.67,cEta:.48},
  {c:"ISR",n:"Israel",sov:55,base:17.83,full:19.39,partial:17.83,dep:14.75,bEta:.93,cEta:.76},
  {c:"CAN",n:"Canada",sov:40,base:16.23,full:18.47,partial:16.23,dep:12.20,bEta:.78,cEta:.60},
  {c:"SGP",n:"Singapore",sov:25,base:15.72,full:18.73,partial:15.72,dep:11.20,bEta:.86,cEta:.67},
  {c:"SAU",n:"Saudi Arabia",sov:30,base:11.09,full:12.22,partial:11.09,dep:8.56,bEta:.47,cEta:.28},
];

// ═══ TSMC SUPPLY CHAIN DATA ═══
const TSMC_DUR=[{l:"1 week",w:1,fab:.10,gC:-2.1,uG:-0.8,cG:-1.2,rec:"Immediate"},{l:"2 weeks",w:2,fab:.05,gC:-4.3,uG:-1.9,cG:-2.8,rec:"2\u20134 weeks"},{l:"1 month",w:4,fab:.02,gC:-8.7,uG:-4.1,cG:-6.3,rec:"2\u20133 months"},{l:"2 months",w:8,fab:.01,gC:-15.2,uG:-7.8,cG:-11.4,rec:"4\u20136 months"},{l:"6 months",w:26,fab:0,gC:-28.6,uG:-14.2,cG:-22.1,rec:"12\u201318 months"},{l:"1 year",w:52,fab:0,gC:-37.4,uG:-18.9,cG:-29.7,rec:"24\u201336 months"}];
const TSMC_CI={USA:{dep:.72,alt:.15},CHN:{dep:.88,alt:.05},KOR:{dep:.45,alt:.40},JPN:{dep:.55,alt:.30},DEU:{dep:.68,alt:.08},TWN:{dep:.95,alt:.02},IND:{dep:.60,alt:.05}};
const GDPTS={USA:[{y:2020,gdi:29.2,gdp:20900},{y:2025,gdi:61.1,gdp:29900},{y:2030,gdi:88.1,gdp:35800},{y:2034,gdi:92.5,gdp:40200},{y:2040,gdi:113.9,gdp:52100},{y:2046,gdi:135.5,gdp:67300}],CHN:[{y:2020,gdi:17.5,gdp:14700},{y:2025,gdi:41.5,gdp:19500},{y:2030,gdi:63.7,gdp:24800},{y:2034,gdi:81.0,gdp:29600},{y:2040,gdi:120.6,gdp:41200},{y:2046,gdi:161.8,gdp:57400}],KOR:[{y:2020,gdi:12.6,gdp:1640},{y:2025,gdi:28.8,gdp:1850},{y:2030,gdi:42.5,gdp:2210},{y:2034,gdi:51.5,gdp:2520},{y:2040,gdi:67.1,gdp:3200},{y:2046,gdi:77.5,gdp:4050}],DEU:[{y:2020,gdi:7.6,gdp:3800},{y:2025,gdi:18.4,gdp:4600},{y:2030,gdi:30.7,gdp:5200},{y:2034,gdi:39.9,gdp:5800},{y:2040,gdi:48.9,gdp:6900},{y:2046,gdi:50.7,gdp:8100}],IND:[{y:2020,gdi:4.4,gdp:2700},{y:2025,gdi:10.7,gdp:4000},{y:2030,gdi:17.2,gdp:5800},{y:2034,gdi:22.9,gdp:7400},{y:2040,gdi:38.9,gdp:11800},{y:2046,gdi:53.4,gdp:18600}]};
function cesCalc(C,E,eta,gdp,a,s){const rho=(s-1)/s;const gf=Math.log(gdp)/Math.log(70000);return eta*gf*100*Math.pow(a*Math.pow(Math.max(C,.1),rho)+(1-a)*Math.pow(Math.max(E,.1),rho),1/rho)}

// ═══ TABS & STYLING ═══
const TABS=["\u2699 Sandbox","Rankings","Trajectories","C vs E","GDI\u2194GDP","Feedback","Disruptions","Supply Chain","Sovereign AI","Deep Dive","Model"];
const MXC={Solar:"#f59e0b",Wind:"#3b82f6",Nuclear:"#8b5cf6",Gas:"#64748b",Coal:"#334155",Hydro:"#06b6d4"};
const cd={background:"rgba(30,41,59,.5)",borderRadius:12,border:"1px solid rgba(148,163,184,.1)",padding:"20px 16px"};

const Tip=({active,payload,label})=>{
  if(!active||!payload?.length)return null;
  return <div style={{background:"rgba(15,23,42,.95)",border:"1px solid rgba(148,163,184,.3)",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#e2e8f0"}}>
    {label&&<p style={{fontWeight:700,marginBottom:4,color:"#94a3b8"}}>{label}</p>}
    {payload.filter(p=>p.value!=null&&p.name).map((p,i)=><p key={i} style={{color:p.color||p.stroke||"#e2e8f0",margin:"2px 0"}}>{p.name}: <b>{typeof p.value==='number'?p.value.toFixed(2):p.value}</b></p>)}
  </div>;
};

const Note=({color,children})=><div style={{marginTop:14,padding:"12px 16px",background:`${color}0a`,borderRadius:8,border:`1px solid ${color}22`}}><p style={{fontSize:12,margin:0,color:`${color}cc`,lineHeight:1.6}}>{children}</p></div>;

export default function App() {
  const [tab,setTab]=useState(0);
  const [sel,setSel]=useState("USA");
  const [cmp,setCmp]=useState(["USA","CHN","KOR","EU"]);
  const [met,setMet]=useState("flex");
  const [disSel,setDisSel]=useState(0);
  const [pA,setPA]=useState(0.55);const [pS,setPS]=useState(0.35);const [pC,setPC]=useState("USA");const [tD,setTD]=useState(4);

  const scatter=useMemo(()=>R.map(r=>({name:r.n,code:r.c,x:r.C,y:r.E,z:Math.sqrt(r.g)*2,gdi:met==="flex"?r.f:r.s,color:CL[r.c]})),[met]);
  const radar=useMemo(()=>{const s=SN[sel];if(!s)return[];return[{d:"Models",v:s.cm},{d:"Infra",v:s.ci},{d:"Gen",v:s.eg},{d:"T&D",v:s.et},{d:"Storage",v:s.es},{d:"Semi",v:s.semi},{d:"GPU",v:s.gpu}]},[sel]);
  const mixD=useMemo(()=>{const s=SN[sel];if(!s)return[];return Object.entries(s.mix).filter(([,v])=>v>0).map(([k,v])=>({name:k[0].toUpperCase()+k.slice(1),value:Math.round(v*100)})).sort((a,b)=>b.value-a.value)},[sel]);
  const sandRank=useMemo(()=>R.map(r=>{const g=cesCalc(r.C,r.E,r.e,r.g,pA,pS);return{...r,sg:g,d:g-r.f}}).sort((a,b)=>b.sg-a.sg),[pA,pS]);
  const sensi=useMemo(()=>{const r=R.find(x=>x.c===pC);if(!r)return[];const p=[];for(let s=.1;s<=.9;s+=.05)p.push({sigma:+s.toFixed(2),gdi:+cesCalc(r.C,r.E,r.e,r.g,pA,s).toFixed(2)});return p},[pA,pC]);
  const tsmcRec=useMemo(()=>{const dur=TSMC_DUR[tD];const m=[];for(let i=0;i<=36;i++){const e={month:i};for(const[c,ci]of Object.entries(TSMC_CI)){const r=R.find(x=>x.c===c);if(!r)continue;const dMo=dur.w/4.33;if(i<dMo){const red=ci.dep*(1-dur.fab);e[c]=+cesCalc(r.C*(1-red),r.E,r.e,r.g,.55,.35).toFixed(2)}else{const ms=i-dMo;const rr=ms<=6?.05:.10;const rec=Math.min(1,ci.alt+rr*ms);const red=ci.dep*(1-dur.fab)*(1-rec);e[c]=+cesCalc(r.C*(1-Math.max(0,red)),r.E,r.e,r.g,.55,.35).toFixed(2)}}m.push(e)}return m},[tD]);

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)",color:"#e2e8f0",fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div style={{borderBottom:"1px solid rgba(148,163,184,.15)",padding:"16px 20px",background:"rgba(15,23,42,.7)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:1440,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"baseline",gap:8}}>
            <h1 style={{fontSize:24,fontWeight:800,margin:0,background:"linear-gradient(135deg,#60a5fa,#a78bfa,#f472b6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>GDI</h1>
            <span style={{fontSize:11,color:"#475569"}}>Gross Domestic Intelligence · v1.2</span>
          </div>
          <div style={{display:"flex",gap:2,flexWrap:"wrap"}}>
            {TABS.map((t,i)=><button key={t} onClick={()=>setTab(i)} style={{padding:"4px 11px",borderRadius:5,border:"none",cursor:"pointer",fontSize:11,fontWeight:tab===i?600:400,background:tab===i?"rgba(99,102,241,.25)":"transparent",color:tab===i?"#a5b4fc":"#64748b"}}>{t}</button>)}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1440,margin:"0 auto",padding:"20px 20px 60px"}}>

      {/* ═══ TAB 0: SANDBOX ═══ */}
      {tab===0&&<div>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 6px"}}>{"\u2699"} Interactive Parameter Sandbox</h2>
        <p style={{fontSize:11,color:"#64748b",margin:"0 0 14px"}}>Adjust CES production function parameters and see GDI rankings change in real-time</p>
        <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:16}}>
          <div style={{...cd,padding:"20px"}}>
            <h3 style={{fontSize:13,fontWeight:700,color:"#a78bfa",margin:"0 0 14px"}}>{"\u{1F39B}\uFE0F"} Model Parameters</h3>
            <div style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#94a3b8",marginBottom:3}}><span>{"\u03B1"} (Compute Share)</span><span style={{color:"#60a5fa",fontWeight:700,fontFamily:"monospace"}}>{pA.toFixed(2)}</span></div><input type="range" min={.3} max={.7} step={.01} value={pA} onChange={e=>setPA(+e.target.value)} style={{width:"100%",accentColor:"#60a5fa"}}/></div>
            <div style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#94a3b8",marginBottom:3}}><span>{"\u03C3"} (Substitution Elasticity)</span><span style={{color:"#a78bfa",fontWeight:700,fontFamily:"monospace"}}>{pS.toFixed(2)}</span></div><input type="range" min={.1} max={.9} step={.01} value={pS} onChange={e=>setPS(+e.target.value)} style={{width:"100%",accentColor:"#a78bfa"}}/></div>
            <div style={{padding:12,background:"rgba(99,102,241,.08)",borderRadius:8,fontSize:10,lineHeight:1.8,color:"#cbd5e1"}}>
              <div style={{fontWeight:600,color:"#a5b4fc",marginBottom:4}}>CES Formula:</div>
              <div style={{fontFamily:"monospace",fontSize:9}}>GDI = {"\u03B7"}·g(GDP)·[{"\u03B1"}·C^{"\u03C1"}+(1-{"\u03B1"})·E^{"\u03C1"}]^(1/{"\u03C1"})</div>
              <div style={{marginTop:6,color:"#64748b"}}>{"\u03C1"} = {((pS-1)/pS).toFixed(3)}</div>
            </div>
            <div style={{marginTop:14}}><div style={{fontSize:11,color:"#94a3b8",marginBottom:6}}>Sensitivity Country</div><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{["USA","CHN","KOR","DEU","IND","TWN"].map(c=><button key={c} onClick={()=>setPC(c)} style={{padding:"2px 7px",borderRadius:4,border:"none",cursor:"pointer",fontSize:9,background:pC===c?CL[c]+"33":"rgba(51,65,85,.4)",color:pC===c?CL[c]:"#94a3b8"}}>{FL[c]}{c}</button>)}</div></div>
          </div>
          <div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={cd}><h3 style={{fontSize:12,fontWeight:600,color:"#94a3b8",margin:"0 0 8px"}}>Adjusted Rankings</h3><div style={{maxHeight:400,overflowY:"auto"}}>{sandRank.slice(0,15).map((r,i)=><div key={r.c} style={{display:"flex",justifyContent:"space-between",padding:"5px 8px",borderBottom:"1px solid rgba(148,163,184,.06)",fontSize:11}}><div style={{display:"flex",gap:6}}><span style={{color:"#64748b",fontSize:9,width:16}}>#{i+1}</span><span>{FL[r.c]} {r.c}</span></div><div style={{display:"flex",gap:8}}><span style={{fontWeight:700,color:CL[r.c],fontFamily:"monospace"}}>{r.sg.toFixed(1)}</span><span style={{fontSize:9,color:r.d>0?"#34d399":r.d<-1?"#ef4444":"#64748b",fontFamily:"monospace"}}>{r.d>0?"+":""}{r.d.toFixed(1)}</span></div></div>)}</div></div>
            <div style={cd}><h3 style={{fontSize:12,fontWeight:600,color:"#94a3b8",margin:"0 0 8px"}}>{FL[pC]} {pC}: GDI vs {"\u03C3"}</h3><ResponsiveContainer width="100%" height={400}><LineChart data={sensi} margin={{left:5,right:15}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis dataKey="sigma" tick={{fontSize:10,fill:"#94a3b8"}}/><YAxis tick={{fontSize:10,fill:"#94a3b8"}}/><Tooltip content={<Tip/>}/><ReferenceLine x={pS} stroke="#f472b6" strokeDasharray="4 4"/><Line dataKey="gdi" name="GDI" stroke={CL[pC]} strokeWidth={2.5} dot={false}/></LineChart></ResponsiveContainer></div>
          </div>
          <Note color="#a78bfa"><b>Insight:</b> {pS<.3?"Low \u03C3: C and E are near-perfect complements. Countries with C/E imbalance are heavily penalized.":pS>.6?"High \u03C3: compute substitutes for energy. Favors compute-heavy US and Korea.":"Moderate \u03C3: the US benefits from compute lead while still constrained by energy."} {pA>.55?`Higher \u03B1=${pA.toFixed(2)} weights compute, favoring USA/Korea.`:`Lower \u03B1=${pA.toFixed(2)} weights energy, favoring China/Germany.`}</Note>
          </div>
        </div>
      </div>}

      {/* ═══ TAB 1: RANKINGS ═══ */}
      {tab===1&&<div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
          <h2 style={{fontSize:20,fontWeight:700,margin:0}}>GDI Rankings 2025</h2>
          <div style={{display:"flex",gap:5}}>{["flex","strict"].map(m=><button key={m} onClick={()=>setMet(m)} style={{padding:"3px 10px",borderRadius:5,border:met===m?"1px solid #6366f1":"1px solid rgba(148,163,184,.2)",background:met===m?"rgba(99,102,241,.15)":"transparent",color:met===m?"#a5b4fc":"#94a3b8",cursor:"pointer",fontSize:10}}>GDI_{m}</button>)}</div>
        </div>
        <div style={cd}><ResponsiveContainer width="100%" height={500}><BarChart data={R.map(r=>({...r,val:met==="flex"?r.f:r.s,lb:`${FL[r.c]} ${r.c}`}))} layout="vertical" margin={{left:70,right:20}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis type="number" tick={{fontSize:10,fill:"#94a3b8"}}/><YAxis type="category" dataKey="lb" tick={{fontSize:11,fill:"#e2e8f0"}} width={65}/><Tooltip content={<Tip/>}/><Bar dataKey="val" name={`GDI_${met}`} radius={[0,4,4,0]} barSize={15}>{R.map((r,i)=><Cell key={i} fill={CL[r.c]} fillOpacity={.8}/>)}</Bar></BarChart></ResponsiveContainer></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:8,marginTop:14}}>
          {R.slice(0,10).map((r,i)=><div key={r.c} onClick={()=>{setSel(r.c);setTab(9)}} style={{background:"rgba(30,41,59,.3)",borderRadius:8,border:"1px solid rgba(148,163,184,.06)",padding:"12px 14px",cursor:"pointer",borderLeft:`3px solid ${CL[r.c]}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:18}}>{FL[r.c]}</span><div><div style={{fontWeight:700,fontSize:13}}>{r.n}</div><div style={{fontSize:9,color:"#64748b"}}>#{i+1}</div></div></div><div style={{fontSize:20,fontWeight:800,color:CL[r.c]}}>{(met==="flex"?r.f:r.s).toFixed(1)}</div></div>
            <div style={{display:"flex",gap:12,marginTop:8,fontSize:9,color:"#94a3b8"}}><span>C:<b style={{color:"#60a5fa"}}>{r.C.toFixed(0)}</b></span><span>E:<b style={{color:"#34d399"}}>{r.E.toFixed(0)}</b></span><span>{"\u03B7"}:<b style={{color:"#fbbf24"}}>{r.e}</b></span></div></div>)}
        </div>
      </div>}

      {/* ═══ TAB 1: TRAJECTORIES ═══ */}
      {tab===2&&<div>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 10px"}}>GDI Trajectories 1995–2046</h2>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>{["USA","CHN","KOR","JPN","EU","DEU","FRA","GBR","TWN","VNM","IND"].map(c=><button key={c} onClick={()=>setCmp(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c])} style={{padding:"3px 9px",borderRadius:4,fontSize:10,cursor:"pointer",border:"none",background:cmp.includes(c)?CL[c]+"33":"rgba(51,65,85,.5)",color:cmp.includes(c)?CL[c]:"#94a3b8",fontWeight:cmp.includes(c)?600:400}}>{FL[c]} {c}</button>)}</div>
        <div style={cd}><ResponsiveContainer width="100%" height={440}><ComposedChart margin={{left:10,right:20}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis dataKey="y" type="number" domain={[1995,2046]} tick={{fontSize:10,fill:"#94a3b8"}} ticks={[1995,2005,2015,2025,2035,2046]}/><YAxis tick={{fontSize:10,fill:"#94a3b8"}}/><Tooltip content={<Tip/>}/>
          {cmp.map(c=>TS[c]&&<Area key={"a"+c} data={TS[c].filter(d=>d.hi)} dataKey="hi" fill={CL[c]} fillOpacity={.06} stroke="none" legendType="none" name=""/>)}
          {cmp.map(c=>TS[c]&&<Line key={c} data={TS[c]} dataKey="f" name={`${FL[c]} ${c}`} stroke={CL[c]} strokeWidth={2.5} dot={{r:2}} connectNulls/>)}
          <Legend wrapperStyle={{fontSize:11}}/></ComposedChart></ResponsiveContainer></div>
        <Note color="#6366f1"><b>Insight:</b> China overtakes the US in absolute GDI around 2030, driven by energy surplus and accelerating compute. Korea (48) and Germany (52) converge by 2046 via different paths. Vietnam (2.2{"\u2192"}11.6) shows fastest relative growth. US peaks near 76 as it approaches infrastructure saturation limits.</Note>
      </div>}

      {/* ═══ TAB 2: C vs E ═══ */}
      {tab===3&&<div>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 10px"}}>Computing vs Energy Phase Space</h2>
        <div style={cd}><ResponsiveContainer width="100%" height={480}><ScatterChart margin={{left:10,right:20,bottom:25}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis dataKey="x" type="number" domain={[0,110]} tick={{fontSize:10,fill:"#94a3b8"}} label={{value:"Computing (C)",position:"bottom",offset:8,style:{fontSize:10,fill:"#64748b"}}}/><YAxis dataKey="y" type="number" domain={[0,85]} tick={{fontSize:10,fill:"#94a3b8"}} label={{value:"Energy (E)",angle:-90,position:"insideLeft",style:{fontSize:10,fill:"#64748b"}}}/><ZAxis dataKey="z" range={[200,1500]}/>
          <Tooltip content={({active,payload})=>{if(!active||!payload?.length)return null;const d=payload[0].payload;return <div style={{background:"rgba(15,23,42,.95)",border:"1px solid rgba(148,163,184,.3)",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#e2e8f0"}}><p style={{fontWeight:700}}>{FL[d.code]} {d.name}</p><p>C: <b style={{color:"#60a5fa"}}>{d.x.toFixed(1)}</b> E: <b style={{color:"#34d399"}}>{d.y.toFixed(1)}</b></p><p>GDI: <b style={{color:d.color}}>{d.gdi.toFixed(2)}</b></p></div>}}/>
          <Scatter data={[{x:0,y:0,z:0},{x:100,y:100,z:0}]} fill="none" line={{stroke:"#475569",strokeDasharray:"6 4"}} legendType="none"/>
          <Scatter data={scatter} shape={({cx,cy,payload})=><g><circle cx={cx} cy={cy} r={Math.max(6,payload.z/9)} fill={payload.color} fillOpacity={.3} stroke={payload.color} strokeWidth={1.5}/><text x={cx} y={cy-Math.max(6,payload.z/9)-4} textAnchor="middle" fill="#e2e8f0" fontSize={9} fontWeight={600}>{payload.code}</text></g>}/>
        </ScatterChart></ResponsiveContainer></div>
      </div>}

      {/* ═══ TAB 3: GDI ↔ GDP (ENHANCED) ═══ */}
      {tab===4&&<div>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 6px"}}>GDI {"\u2194"} GDP Relationship</h2>
        <p style={{fontSize:11,color:"#64748b",margin:"0 0 14px"}}>Cross-sectional (2025) and temporal trajectories (2020{"\u2013"}2046)</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div style={cd}>
            <h3 style={{fontSize:13,fontWeight:600,color:"#94a3b8",margin:"0 0 8px"}}>GDI vs GDP Temporal Trajectories (2020{"\u2192"}2046)</h3>
            <ResponsiveContainer width="100%" height={360}><ScatterChart margin={{left:10,right:20,bottom:25}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis dataKey="gdi" name="GDI" type="number" tick={{fontSize:10,fill:"#94a3b8"}} label={{value:"GDI",position:"bottom",offset:8,style:{fontSize:10,fill:"#64748b"}}}/><YAxis dataKey="gdp" name="GDP" type="number" tick={{fontSize:10,fill:"#94a3b8"}} label={{value:"GDP ($B)",angle:-90,position:"insideLeft",style:{fontSize:10,fill:"#64748b"}}}/>
              <Tooltip content={({active,payload})=>{if(!active||!payload?.length)return null;const d=payload[0].payload;return <div style={{background:"rgba(15,23,42,.95)",borderRadius:8,padding:"10px",fontSize:11,color:"#e2e8f0",border:"1px solid rgba(148,163,184,.3)"}}><b>{d.cc} ({d.yr})</b><br/>GDI: {d.gdi.toFixed(1)} · GDP: ${(d.gdp/1000).toFixed(1)}T</div>}}/>
              {Object.entries(GDPTS).map(([code,pts])=><Scatter key={code} data={pts.map(p=>({...p,cc:code,yr:p.y}))} fill={CL[code]} line={{stroke:CL[code],strokeWidth:1.5}} shape={({cx,cy,payload})=>{const last=payload.yr===2046;const first=payload.yr===2020;return <g><circle cx={cx} cy={cy} r={last?5:first?4:3} fill={CL[payload.cc]} fillOpacity={last?.9:.5} stroke={CL[payload.cc]} strokeWidth={1}/>{(last||first)&&<text x={cx+7} y={cy+3} fill={CL[payload.cc]} fontSize={8} fontWeight={600}>{payload.cc} {payload.yr}</text>}</g>}}/>)}
            </ScatterChart></ResponsiveContainer>
            <div style={{fontSize:10,color:"#64748b",textAlign:"center",marginTop:4}}>Dots: 2020 {"\u2192"} 2025 {"\u2192"} 2030 {"\u2192"} 2034 {"\u2192"} 2040 {"\u2192"} 2046</div>
          </div>
          <div style={cd}>
            <h3 style={{fontSize:13,fontWeight:600,color:"#94a3b8",margin:"0 0 8px"}}>AI Contribution to GDP (%)</h3>
            <ResponsiveContainer width="100%" height={300}><BarChart data={AICONTRIB} margin={{left:0,right:10}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis dataKey="c" tick={{fontSize:10,fill:"#94a3b8"}}/><YAxis tick={{fontSize:10,fill:"#94a3b8"}} unit="%"/><Tooltip content={<Tip/>}/><Legend wrapperStyle={{fontSize:10}}/>
              <Bar dataKey="now" name="2025" fill="#6366f1" fillOpacity={.7} radius={[3,3,0,0]} barSize={14}/>
              <Bar dataKey="y30" name="2030" fill="#a78bfa" fillOpacity={.7} radius={[3,3,0,0]} barSize={14}/>
              <Bar dataKey="y36" name="2036" fill="#f472b6" fillOpacity={.7} radius={[3,3,0,0]} barSize={14}/>
            </BarChart></ResponsiveContainer>
            <div style={{marginTop:8,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>{[{c:"USA",r:"3.9%"},{c:"CHN",r:"6.8%"},{c:"IND",r:"8.1%"}].map(({c,r})=><div key={c} style={{background:`${CL[c]}11`,borderRadius:6,padding:"6px 8px",borderLeft:`3px solid ${CL[c]}`}}><div style={{fontSize:9,color:"#64748b"}}>{FL[c]} CAGR 25{"\u2013"}46</div><div style={{fontSize:15,fontWeight:700,color:CL[c]}}>{r}</div></div>)}</div>
          </div>
        </div>
        <Note color="#a78bfa"><b>Temporal co-evolution:</b> GDI and GDP follow convex trajectories{"\u2014"}each GDI point generates accelerating GDP growth as AI permeates more sectors. India's steep curve reflects the fastest co-evolution. Japan's flatter trajectory shows the GDP stagnation paradox despite rising GDI. China overtakes USA in GDI around 2034 but GDP crossover occurs later (~2040).</Note>
      </div>}

      {/* ═══ TAB 4: FEEDBACK CYCLE ═══ */}
      {tab===5&&<div>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 6px"}}>GDI {"\u2192"} GDP {"\u2192"} Capital {"\u2192"} GDI Feedback Cycle</h2>
        <p style={{fontSize:11,color:"#64748b",margin:"0 0 14px"}}>The self-reinforcing loop: intelligence creates economic value, which funds more intelligence</p>
        {/* Cycle Diagram */}
        <div style={{...cd,textAlign:"center",padding:"30px 20px",marginBottom:14}}>
          <svg viewBox="0 0 600 200" style={{maxWidth:600,width:"100%"}}>
            {[{x:60,y:100,label:"GDI",sub:"Intelligence",color:"#a78bfa"},{x:220,y:100,label:"GDP",sub:"Economic Value",color:"#34d399"},{x:380,y:100,label:"Capital",sub:"Investment $",color:"#fbbf24"},{x:540,y:100,label:"C + E",sub:"Infra Growth",color:"#60a5fa"}].map((n,i)=><g key={i}><rect x={n.x-45} y={n.y-30} width={90} height={60} rx={10} fill={`${n.color}22`} stroke={n.color} strokeWidth={1.5}/><text x={n.x} y={n.y-5} textAnchor="middle" fill={n.color} fontSize={14} fontWeight={700}>{n.label}</text><text x={n.x} y={n.y+14} textAnchor="middle" fill="#94a3b8" fontSize={8}>{n.sub}</text></g>)}
            {[[105,90,175,90],[265,90,335,90],[425,90,495,90]].map(([x1,y1,x2,y2],i)=><g key={`a${i}`}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth={1.5} markerEnd="url(#arrow)"/></g>)}
            <line x1={540} y1={70} x2={540} y2={40} stroke="#64748b" strokeWidth={1}/>
            <line x1={540} y1={40} x2={60} y2={40} stroke="#64748b" strokeWidth={1} strokeDasharray="4 3"/>
            <line x1={60} y1={40} x2={60} y2={70} stroke="#64748b" strokeWidth={1} markerEnd="url(#arrow)"/>
            <text x={300} y={33} textAnchor="middle" fill="#f472b6" fontSize={9} fontWeight={600}>{"\u{1F504}"} Feedback Loop: Investment returns as new intelligence</text>
            <defs><marker id="arrow" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#64748b"/></marker></defs>
          </svg>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {["USA","CHN"].map(c=><div key={c} style={cd}>
            <h3 style={{fontSize:13,fontWeight:600,color:CL[c],margin:"0 0 6px"}}>{FL[c]} {c} — 10-Year Cycle Projection</h3>
            <ResponsiveContainer width="100%" height={250}><ComposedChart data={FEEDBACK[c]} margin={{left:5,right:10}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis dataKey="y" tick={{fontSize:10,fill:"#94a3b8"}}/><YAxis yAxisId="l" tick={{fontSize:10,fill:"#94a3b8"}} label={{value:"GDI",angle:-90,position:"insideLeft",style:{fontSize:9,fill:"#64748b"}}}/><YAxis yAxisId="r" orientation="right" tick={{fontSize:10,fill:"#94a3b8"}} label={{value:"AI Value ($B)",angle:90,position:"insideRight",style:{fontSize:9,fill:"#64748b"}}}/><Tooltip content={<Tip/>}/>
              <Line yAxisId="l" dataKey="gdi" name="GDI" stroke={CL[c]} strokeWidth={2.5} dot={{r:3}}/>
              <Bar yAxisId="r" dataKey="ai" name="AI Value ($B)" fill="#a78bfa" fillOpacity={.3} barSize={20}/>
            </ComposedChart></ResponsiveContainer>
          </div>)}
        </div>
        <Note color="#fbbf24"><b>Cycle multiplier: ~2.0{"\u00D7"}</b> — Every dollar invested in AI infrastructure generates approximately $2 in economic value over the cycle. The US generates $1.24T/yr in AI economic value (2025), reinvesting $621B into C+E infrastructure. This creates a compounding advantage that is extremely difficult for laggards to close.</Note>
      </div>}

      {/* ═══ TAB 5: DISRUPTIONS ═══ */}
      {tab===6&&<div>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 6px"}}>Disruption Scenario Analysis</h2>
        <p style={{fontSize:11,color:"#64748b",margin:"0 0 14px"}}>How technology breakthroughs would reshape national GDI rankings</p>
        <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          {DISRUPTIONS.map((d,i)=><button key={d.id} onClick={()=>setDisSel(i)} style={{padding:"6px 14px",borderRadius:7,border:"none",cursor:"pointer",fontSize:11,fontWeight:disSel===i?700:400,background:disSel===i?"rgba(244,114,182,.2)":"rgba(51,65,85,.4)",color:disSel===i?"#f472b6":"#94a3b8"}}>{d.icon} {d.name}</button>)}
        </div>
        {(()=>{const d=DISRUPTIONS[disSel];return <div>
          <div style={{...cd,marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div><span style={{fontSize:28,marginRight:8}}>{d.icon}</span><span style={{fontSize:18,fontWeight:700,color:"#f472b6"}}>{d.name}</span></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:11,color:"#94a3b8"}}>Est. year: <b style={{color:"#e2e8f0"}}>{d.year}</b></div><div style={{fontSize:11,color:"#94a3b8"}}>Probability: <b style={{color:d.prob>10?"#fbbf24":"#ef4444"}}>{d.prob}%</b></div></div>
            </div>
            <p style={{fontSize:12,color:"#cbd5e1",margin:"0 0 12px"}}>{d.desc}</p>
            <ResponsiveContainer width="100%" height={300}><BarChart data={d.impacts.sort((a,b)=>b.d-a.d)} layout="vertical" margin={{left:55,right:30}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis type="number" tick={{fontSize:10,fill:"#94a3b8"}} unit="%" label={{value:"GDI Change %",position:"bottom",style:{fontSize:10,fill:"#64748b"}}}/><YAxis type="category" dataKey="c" tick={({x,y,payload})=><text x={x} y={y} dy={4} textAnchor="end" fill="#e2e8f0" fontSize={11}>{FL[payload.value]} {payload.value}</text>} width={50}/><Tooltip content={({active,payload})=>{if(!active||!payload?.length)return null;const p=payload[0].payload;return <div style={{background:"rgba(15,23,42,.95)",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#e2e8f0",border:"1px solid rgba(148,163,184,.3)"}}><b>{FL[p.c]} {p.c}</b><br/>Base: {p.b.toFixed(1)} {"\u2192"} New: {p.n.toFixed(1)}<br/>Change: <b style={{color:"#34d399"}}>{p.d>0?"+":""}{p.d.toFixed(1)}%</b></div>}}/>
              <Bar dataKey="d" name="GDI Change %" radius={[0,4,4,0]} barSize={16}>{d.impacts.map((imp,i)=><Cell key={i} fill={imp.d>50?"#f472b6":imp.d>20?"#a78bfa":"#6366f1"} fillOpacity={.7}/>)}</Bar>
            </BarChart></ResponsiveContainer>
          </div>
          <Note color="#f472b6"><b>Key finding:</b> {d.id==="sc"?"Superconductors have the largest impact on energy-constrained nations like Germany (+78%) and Japan (+71%) by eliminating T&D losses.":d.id==="fu"?"Fusion primarily benefits the US (+28%) due to its massive energy demand for AI datacenters. Impact is smaller for nations already energy-surplus.":d.id==="ns"?"Post-silicon chips are the biggest equalizer: Germany (+105%) and China (+44%) benefit most. China could leapfrog US export controls entirely.":"Space datacenters disproportionately benefit large developing nations like India (+45%) that face terrestrial infrastructure constraints."}</Note>
        </div>})()}
      </div>}

      {/* ═══ TAB 7: SUPPLY CHAIN (TSMC) ═══ */}
      {tab===7&&<div>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 6px"}}>{"\u26A0\uFE0F"} Supply Chain Disruption: Taiwan Semiconductor</h2>
        <p style={{fontSize:11,color:"#64748b",margin:"0 0 14px"}}>TSMC produces ~92% of advanced AI chips ({"\u2264"}5nm). Model disruption duration and observe GDI impact + recovery.</p>
        <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:16}}>
          <div style={{...cd,padding:"18px"}}>
            <h3 style={{fontSize:13,fontWeight:700,color:"#ef4444",margin:"0 0 12px"}}>{"\u{1F3AF}"} Scenario Controls</h3>
            <div style={{fontSize:11,color:"#94a3b8",marginBottom:6}}>Disruption Duration</div>
            {TSMC_DUR.map((d,i)=><button key={i} onClick={()=>setTD(i)} style={{display:"block",width:"100%",padding:"5px 10px",marginBottom:3,borderRadius:5,border:"none",cursor:"pointer",fontSize:11,textAlign:"left",background:tD===i?"rgba(239,68,68,.2)":"rgba(51,65,85,.3)",color:tD===i?"#fca5a5":"#94a3b8",fontWeight:tD===i?600:400}}>{d.l} <span style={{float:"right",fontSize:9,color:"#ef4444"}}>{d.gC}% C</span></button>)}
            <div style={{marginTop:12,padding:10,background:"rgba(239,68,68,.08)",borderRadius:8,borderLeft:"3px solid #ef4444"}}>
              <div style={{fontSize:10,color:"#fca5a5",fontWeight:600,marginBottom:4}}>Impact: {TSMC_DUR[tD].l}</div>
              <div style={{fontSize:10,color:"#e2e8f0",lineHeight:1.8}}>
                Fab util: <b style={{color:"#ef4444"}}>{(TSMC_DUR[tD].fab*100).toFixed(0)}%</b><br/>
                Global C: <b style={{color:"#ef4444"}}>{TSMC_DUR[tD].gC}%</b><br/>
                USA GDI: <b style={{color:"#f97316"}}>{TSMC_DUR[tD].uG}%</b><br/>
                CHN GDI: <b style={{color:"#ef4444"}}>{TSMC_DUR[tD].cG}%</b><br/>
                Recovery: <b style={{color:"#fbbf24"}}>{TSMC_DUR[tD].rec}</b>
              </div>
            </div>
          </div>
          <div>
            <div style={{...cd,marginBottom:12}}>
              <h3 style={{fontSize:13,fontWeight:600,color:"#94a3b8",margin:"0 0 8px"}}>GDI Recovery Trajectories ({TSMC_DUR[tD].l} disruption)</h3>
              <ResponsiveContainer width="100%" height={320}><LineChart data={tsmcRec} margin={{left:5,right:15}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis dataKey="month" tick={{fontSize:10,fill:"#94a3b8"}} label={{value:"Months",position:"bottom",style:{fontSize:10,fill:"#64748b"}}}/><YAxis tick={{fontSize:10,fill:"#94a3b8"}} label={{value:"GDI",angle:-90,position:"insideLeft",style:{fontSize:10,fill:"#64748b"}}}/><Tooltip content={<Tip/>}/>
                <ReferenceLine x={Math.round(TSMC_DUR[tD].w/4.33)} stroke="#ef4444" strokeDasharray="4 4"/>
                {Object.keys(TSMC_CI).map(c=><Line key={c} dataKey={c} name={`${FL[c]} ${c}`} stroke={CL[c]} strokeWidth={2} dot={false}/>)}
                <Legend wrapperStyle={{fontSize:10}}/></LineChart></ResponsiveContainer>
            </div>
            <div style={cd}>
              <h3 style={{fontSize:13,fontWeight:600,color:"#94a3b8",margin:"0 0 8px"}}>Global Compute Impact by Duration</h3>
              <ResponsiveContainer width="100%" height={180}><BarChart data={TSMC_DUR.map((d,i)=>({...d,absC:Math.abs(d.gC)}))} margin={{left:10,right:20}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis dataKey="l" tick={{fontSize:9,fill:"#94a3b8"}}/><YAxis tick={{fontSize:10,fill:"#94a3b8"}} unit="%"/><Tooltip content={<Tip/>}/><Bar dataKey="absC" name="Global C Reduction %" radius={[4,4,0,0]} barSize={28}>{TSMC_DUR.map((d,i)=><Cell key={i} fill={i===tD?"#ef4444":"#475569"} fillOpacity={i===tD?.9:.4}/>)}</Bar></BarChart></ResponsiveContainer>
            </div>
          </div>
        </div>
        <Note color="#ef4444"><b>Critical finding:</b> Disruption duration vs impact is highly nonlinear. A 1-week event cuts global C by just 2.1% (within buffer), but 6 months causes 28.6% as inventories deplete within 4{"\u2013"}8 weeks. China is disproportionately vulnerable ({TSMC_DUR[tD].cG}% vs USA {TSMC_DUR[tD].uG}%) due to export controls limiting alternative sourcing. Taiwan itself faces a {"\u2013"}64% GDI collapse in the 1-year scenario.</Note>
      </div>}

      {/* ═══ TAB 6: SOVEREIGN AI ═══ */}
      {tab===8&&<div>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 6px"}}>Sovereign AI Impact on GDI</h2>
        <p style={{fontSize:11,color:"#64748b",margin:"0 0 14px"}}>How domestic AI capability (vs dependency on foreign models) affects national intelligence capacity</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div style={cd}>
            <h3 style={{fontSize:13,fontWeight:600,color:"#94a3b8",margin:"0 0 8px"}}>Sovereign AI Score vs GDI (2025)</h3>
            <ResponsiveContainer width="100%" height={320}><ScatterChart margin={{left:10,right:20,bottom:25}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis dataKey="sov" name="Sovereignty" type="number" domain={[0,100]} tick={{fontSize:10,fill:"#94a3b8"}} label={{value:"Sovereign AI Score",position:"bottom",offset:8,style:{fontSize:10,fill:"#64748b"}}}/><YAxis dataKey="base" name="GDI" type="number" tick={{fontSize:10,fill:"#94a3b8"}} label={{value:"GDI_flex",angle:-90,position:"insideLeft",style:{fontSize:10,fill:"#64748b"}}}/>
              <Tooltip content={({active,payload})=>{if(!active||!payload?.length)return null;const d=payload[0].payload;return <div style={{background:"rgba(15,23,42,.95)",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#e2e8f0",border:"1px solid rgba(148,163,184,.3)"}}><b>{FL[d.c]} {d.n}</b><br/>Sovereign Score: <b>{d.sov}</b><br/>GDI: <b>{d.base.toFixed(1)}</b><br/>{"\u03B7"} range: [{d.cEta.toFixed(2)}, {d.bEta.toFixed(2)}]</div>}}/>
              <Scatter data={SOVEREIGN} shape={({cx,cy,payload})=><g><circle cx={cx} cy={cy} r={7} fill={CL[payload.c]||"#6366f1"} fillOpacity={.5} stroke={CL[payload.c]} strokeWidth={1.5}/><text x={cx+10} y={cy+3} fill="#94a3b8" fontSize={8}>{payload.c}</text></g>}/>
            </ScatterChart></ResponsiveContainer>
          </div>
          <div style={cd}>
            <h3 style={{fontSize:13,fontWeight:600,color:"#94a3b8",margin:"0 0 8px"}}>GDI Under Sovereignty Scenarios</h3>
            <ResponsiveContainer width="100%" height={320}><BarChart data={SOVEREIGN.slice(0,10)} margin={{left:0,right:10}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis dataKey="c" tick={({x,y,payload})=><text x={x} y={y+10} textAnchor="middle" fill="#94a3b8" fontSize={9}>{FL[payload.value]}{payload.value}</text>}/><YAxis tick={{fontSize:10,fill:"#94a3b8"}}/><Tooltip content={<Tip/>}/><Legend wrapperStyle={{fontSize:10}}/>
              <Bar dataKey="full" name="Full Sovereignty" fill="#34d399" fillOpacity={.5} radius={[3,3,0,0]} barSize={10}/>
              <Bar dataKey="base" name="Current" fill="#6366f1" fillOpacity={.7} radius={[3,3,0,0]} barSize={10}/>
              <Bar dataKey="dep" name="Fully Dependent" fill="#ef4444" fillOpacity={.4} radius={[3,3,0,0]} barSize={10}/>
            </BarChart></ResponsiveContainer>
          </div>
        </div>
        {/* Sovereignty risk table */}
        <div style={{...cd,marginTop:14,overflowX:"auto"}}>
          <h3 style={{fontSize:13,fontWeight:600,color:"#94a3b8",margin:"0 0 10px"}}>Sovereignty Vulnerability Analysis</h3>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
            <thead><tr style={{borderBottom:"1px solid rgba(148,163,184,.15)"}}>
              {["Country","Sov.Score","\u03B7 Boosted","\u03B7 Crisis","GDI Full","GDI Current","GDI Dependent","Risk Range"].map(h=><th key={h} style={{padding:"6px 8px",textAlign:"left",color:"#64748b",fontWeight:600,fontSize:10}}>{h}</th>)}
            </tr></thead>
            <tbody>{SOVEREIGN.map(s=><tr key={s.c} style={{borderBottom:"1px solid rgba(148,163,184,.06)"}}>
              <td style={{padding:"5px 8px",fontWeight:600}}>{FL[s.c]} {s.n}</td>
              <td style={{padding:"5px 8px"}}><span style={{background:s.sov>70?"rgba(34,197,94,.15)":s.sov>40?"rgba(251,191,36,.15)":"rgba(239,68,68,.15)",color:s.sov>70?"#34d399":s.sov>40?"#fbbf24":"#ef4444",padding:"2px 6px",borderRadius:4,fontWeight:600}}>{s.sov}</span></td>
              <td style={{padding:"5px 8px",color:"#34d399"}}>{s.bEta.toFixed(2)}</td>
              <td style={{padding:"5px 8px",color:"#ef4444"}}>{s.cEta.toFixed(2)}</td>
              <td style={{padding:"5px 8px",color:"#34d399"}}>{s.full.toFixed(1)}</td>
              <td style={{padding:"5px 8px",fontWeight:700}}>{s.base.toFixed(1)}</td>
              <td style={{padding:"5px 8px",color:"#ef4444"}}>{s.dep.toFixed(1)}</td>
              <td style={{padding:"5px 8px"}}><span style={{color:"#f472b6",fontWeight:600}}>{(s.full-s.dep).toFixed(1)}</span> <span style={{color:"#64748b"}}>({((s.full-s.dep)/s.base*100).toFixed(0)}%)</span></td>
            </tr>)}</tbody>
          </table>
        </div>
        <Note color="#ef4444"><b>Sovereignty risk:</b> Nations with low sovereign AI scores (Germany: 20, Taiwan: 15, Japan: 30) face 35–65% GDI vulnerability in a supply disruption. Taiwan is paradoxically the world's semiconductor leader but has almost zero frontier model sovereignty (score: 15). A US-China decoupling scenario could crash its GDI by ~35% if cut off from both ecosystems.</Note>
      </div>}

      {/* ═══ TAB 7: DEEP DIVE ═══ */}
      {tab===9&&<div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
          <h2 style={{fontSize:20,fontWeight:700,margin:0}}>{FL[sel]} {R.find(r=>r.c===sel)?.n} — Deep Dive</h2>
          <div style={{display:"flex",gap:2,flexWrap:"wrap"}}>{Object.keys(SN).map(c=><button key={c} onClick={()=>setSel(c)} style={{padding:"2px 7px",borderRadius:4,border:"none",cursor:"pointer",fontSize:9,background:sel===c?CL[c]+"33":"rgba(51,65,85,.4)",color:sel===c?CL[c]:"#94a3b8"}}>{FL[c]}{c}</button>)}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div style={cd}><h3 style={{fontSize:12,fontWeight:600,color:"#94a3b8",margin:"0 0 4px"}}>Capability Radar</h3><ResponsiveContainer width="100%" height={260}><RadarChart data={radar}><PolarGrid stroke="rgba(148,163,184,.1)"/><PolarAngleAxis dataKey="d" tick={{fontSize:8,fill:"#94a3b8"}}/><PolarRadiusAxis domain={[0,100]} tick={{fontSize:7,fill:"#64748b"}}/><Radar dataKey="v" stroke={CL[sel]} fill={CL[sel]} fillOpacity={.15} strokeWidth={2}/></RadarChart></ResponsiveContainer></div>
          <div style={cd}><h3 style={{fontSize:12,fontWeight:600,color:"#94a3b8",margin:"0 0 4px"}}>Energy Mix</h3><ResponsiveContainer width="100%" height={260}><BarChart data={mixD} margin={{left:0,right:10}}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.06)"/><XAxis dataKey="name" tick={{fontSize:9,fill:"#94a3b8"}}/><YAxis tick={{fontSize:9,fill:"#94a3b8"}} unit="%"/><Tooltip content={<Tip/>}/><Bar dataKey="value" name="%" radius={[3,3,0,0]} barSize={24}>{mixD.map((d,i)=><Cell key={i} fill={MXC[d.name]||"#6366f1"} fillOpacity={.7}/>)}</Bar></BarChart></ResponsiveContainer></div>
        </div>
        {SN[sel]&&(()=>{const s=SN[sel],r=R.find(x=>x.c===sel);if(!r)return null;const ms=[{l:"GDI_flex",v:r.f.toFixed(2),c:"#a78bfa"},{l:"C",v:r.C.toFixed(1),c:"#60a5fa"},{l:"E",v:r.E.toFixed(1),c:"#34d399"},{l:"\u03B7",v:r.e,c:"#fbbf24"},{l:"LCOE",v:`$${s.lcoe}`,c:"#fb923c"},{l:"Semi",v:s.semi,c:"#c084fc"},{l:"GPU",v:s.gpu,c:"#22d3ee"},{l:"GDP",v:`$${(r.g/1000).toFixed(1)}T`,c:"#a3e635"}];return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:6,marginTop:12}}>{ms.map(m=><div key={m.l} style={{background:"rgba(30,41,59,.3)",borderRadius:6,padding:"8px 10px",borderLeft:`3px solid ${m.c}`}}><div style={{fontSize:8,color:"#64748b"}}>{m.l}</div><div style={{fontSize:16,fontWeight:700,color:m.c}}>{m.v}</div></div>)}</div>})()}
      </div>}

      {/* ═══ TAB 8: MODEL ═══ */}
      {tab===10&&<div>
        <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 14px"}}>GDI Model Framework</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div style={cd}><h3 style={{fontSize:14,fontWeight:700,color:"#a5b4fc",margin:"0 0 8px"}}>Production Functions</h3><div style={{fontFamily:"monospace",fontSize:11,lineHeight:1.9,color:"#cbd5e1"}}><p style={{color:"#fbbf24",fontWeight:600}}>Leontief:</p><p style={{paddingLeft:12}}>GDI_strict = min(C, E) {"\u00D7"} {"\u03B7"} {"\u00D7"} {"\u03A6"}(GDP)</p><p style={{color:"#a78bfa",fontWeight:600,marginTop:8}}>CES:</p><p style={{paddingLeft:12}}>GDI_flex = [{"\u03B1"}{"\u00B7"}C{"\u1D68"}+(1-{"\u03B1"}){"\u00B7"}E{"\u1D68"}]{"\u00B9"}{"\u2044"}{"\u1D68"}{"\u00D7"}{"\u03B7"}{"\u00D7"}{"\u03A6"}(GDP)</p><p style={{color:"#34d399",fontWeight:600,marginTop:8}}>Dynamics (Wright's Law):</p><p style={{paddingLeft:12}}>C(t+1) = C(t)(1+{"\u03B4"}-d)+g{"\u00B7"}I/P_C(t)</p><p style={{paddingLeft:12}}>P_C(t) = C{"\u2080"}{"\u00B7"}Q^(-0.68){"\u00B7"}2^(-t/0.7)</p></div></div>
          <div style={cd}><h3 style={{fontSize:14,fontWeight:700,color:"#34d399",margin:"0 0 8px"}}>Learning Rates</h3><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 16px",fontSize:12,color:"#cbd5e1"}}>{[["AI Chips","37.5%","#f472b6"],["Solar PV","22%","#f59e0b"],["Batteries","20%","#22d3ee"],["Wind","16%","#3b82f6"],["Nuclear","~0%","#8b5cf6"],["Inference","77%/yr","#a78bfa"]].map(([n,r,c])=><div key={n} style={{padding:"6px 10px",background:`${c}11`,borderRadius:5,borderLeft:`2px solid ${c}`}}><span style={{color:"#94a3b8"}}>{n}:</span> <b style={{color:c}}>{r}</b></div>)}</div><div style={{marginTop:12,fontSize:11,color:"#64748b"}}>Sources: ARK Invest, Epoch AI, Fraunhofer ISE, IRENA, Berkeley Lab</div></div>
        </div>
      </div>}

      </div>
      <div style={{borderTop:"1px solid rgba(148,163,184,.08)",padding:"12px",textAlign:"center",fontSize:9,color:"#334155"}}>GDI Framework v1.2 · {R.length} countries · Monte Carlo 2K runs · Wright's Law · Supply Chain · Disruptions · Feb 2026</div>
    </div>
  );
}
