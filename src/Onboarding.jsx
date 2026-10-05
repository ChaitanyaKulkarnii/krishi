import React, { useEffect, useState } from 'react'
import FarmerFigure from './FarmerFigure.jsx'
import { Activity, ArrowLeft, ArrowRight, CalendarDays, Check, ChevronDown, CloudRain, Compass, Crosshair, Info, Leaf, LogOut, MapPin, Minus, Plus, ShieldCheck, Sprout, TrendingUp } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import farmerIllustration from './farmer-illustration.png'

const copy = {
 en: {
  logo:'Crop-to-Market Decision Support', signout:'Sign out', farmerCaption:'A farmer checking crop insights on a phone', welcomeKicker:'A CLEARER VIEW OF YOUR FARM', welcomeTitle:'Know what is happening in your field—and what to consider next.', welcomeBody:'KrishiLens brings crop condition, weather, expected harvest and local market information together, so you can make more informed decisions.', step1:'Understand crop condition', step1d:'See crop-growth signals with weather context in simple language.', step2:'Plan around harvest', step2d:'Review an expected yield range and harvest window with confidence context.', step3:'Compare market options', step3d:'Look at nearby prices, arrivals and selling outlook side by side.', analyze:'Analyze your crop', time:'Start with your farm details · about 2 minutes', trust:'Estimates are decision support—not guarantees. Your farm details stay in this demo session.',
  formKicker:'YOUR FARM · STEP 1 OF 1', formTitle:'Tell us about the crop you want to analyze', formBody:'Use the farm you want insights for. You can enter its location or choose to share your device location.', farmLocation:'Farm location or village', farmPlaceholder:'Village or farm area', taluka:'Taluka', talukaPlaceholder:'Enter taluka', liveLocation:'Live farm location', liveHelp:'Use your device location while you are at the farm. It is not sent to a server in this demo.', locate:'Use my live location', locating:'Getting location…', located:'Location captured on this device', denied:'Location unavailable. You can continue with the location entered above.', unavailable:'This device or browser does not support location access.', crop:'Crop sown', chooseCrop:'Select a crop', soybean:'Soybean', cotton:'Cotton', maize:'Maize', sugarcane:'Sugarcane', paddy:'Paddy / rice', other:'Other crop', otherCrop:'Enter crop name', harvestDate:'Harvest date (expected or actual)', harvestHint:'If the crop is not harvested yet, enter your current expected date. This is your estimate, not a prediction.', sowingDate:'Sowing date (optional)', back:'Back', submit:'Continue', formNote:'No satellite, weather or market analysis runs in this prototype. We will not show made-up results for your farm.',
  readyKicker:'FARM DETAILS RECEIVED', readyTitle:'Your crop is ready for analysis', readyBody:'We have your farm details for this demo session. Live crop, weather and market data are not connected, so no farm-specific analysis is shown yet.', readyListTitle:'What KrishiLens is designed to bring together', readyCrop:'Crop condition', readyCropD:'Satellite observations and weather context', readyYield:'Expected yield and harvest window', readyYieldD:'An estimate range with confidence and clear uncertainty', readyMarket:'Market intelligence', readyMarketD:'Nearby price trends, arrivals and a reasoned selling outlook', farmSummary:'YOUR FARM DETAILS', edit:'Edit farm details', overview:'How KrishiLens helps', readyDisclaimer:'This prototype does not produce a real analysis or prediction. Results will appear when validated data sources are connected.'
 },
 mr: {
  logo:'पीक ते बाजार निर्णय सहाय्य', signout:'साइन आउट', farmerCaption:'मोबाईलवर पीक माहिती पाहणारा शेतकरी', welcomeKicker:'तुमच्या शेतीची स्पष्ट माहिती', welcomeTitle:'शेतात काय घडते आहे आणि पुढे काय पाहावे हे समजून घ्या.', welcomeBody:'KrishiLens पीक स्थिती, हवामान, अपेक्षित कापणी आणि स्थानिक बाजार माहिती एकत्र आणते, ज्यामुळे तुम्हाला माहितीपूर्ण निर्णय घेता येतात.', step1:'पीक स्थिती समजून घ्या', step1d:'पीक वाढीचे संकेत आणि हवामान संदर्भ सोप्या भाषेत पाहा.', step2:'कापणीचे नियोजन करा', step2d:'विश्वास पातळीसह अपेक्षित उत्पादन श्रेणी आणि कापणी कालावधी पाहा.', step3:'बाजार पर्यायांची तुलना करा', step3d:'जवळच्या बाजारातील किंमती, आवक आणि विक्रीचा अंदाज पाहा.', analyze:'तुमच्या पिकाचे विश्लेषण करा', time:'शेताची माहिती भरा · साधारण २ मिनिटे', trust:'अंदाज हे निर्णय सहाय्य आहेत, हमी नाहीत. डेमोमध्ये शेताची माहिती या सत्रापुरती राहते.',
  formKicker:'तुमचे शेत · एकूण १ टप्पा', formTitle:'विश्लेषणासाठी पिकाची माहिती द्या', formBody:'ज्या शेतासाठी माहिती हवी आहे ते निवडा. ठिकाण लिहा किंवा डिव्हाइसचे ठिकाण वापरा.', farmLocation:'शेताचे ठिकाण किंवा गाव', farmPlaceholder:'गाव किंवा शेताचा भाग', taluka:'तालुका', talukaPlaceholder:'तालुका लिहा', liveLocation:'थेट शेताचे ठिकाण', liveHelp:'शेतात असताना डिव्हाइसचे ठिकाण वापरा. या डेमोमध्ये ते सर्व्हरवर पाठवले जात नाही.', locate:'माझे थेट ठिकाण वापरा', locating:'ठिकाण घेत आहे…', located:'या डिव्हाइसवर ठिकाण मिळाले', denied:'ठिकाण उपलब्ध नाही. वर लिहिलेल्या ठिकाणासह पुढे जाऊ शकता.', unavailable:'या डिव्हाइसवर ठिकाण वापरता येत नाही.', crop:'लावलेले पीक', chooseCrop:'पीक निवडा', soybean:'सोयाबीन', cotton:'कापूस', maize:'मका', sugarcane:'ऊस', paddy:'भात', other:'इतर पीक', otherCrop:'पिकाचे नाव लिहा', harvestDate:'कापणीची तारीख (अपेक्षित किंवा प्रत्यक्ष)', harvestHint:'पीक कापले नसल्यास तुमची सध्याची अपेक्षित तारीख लिहा. ही तुमची नोंद आहे, अंदाज नाही.', sowingDate:'पेरणीची तारीख (ऐच्छिक)', back:'मागे', submit:'पुढे जा', formNote:'या नमुन्यात उपग्रह, हवामान किंवा बाजार विश्लेषण चालत नाही. तुमच्या शेतासाठी बनावट निकाल दाखवले जाणार नाहीत.',
  readyKicker:'शेताची माहिती मिळाली', readyTitle:'तुमचे पीक विश्लेषणासाठी तयार आहे', readyBody:'डेमो सत्रासाठी शेताची माहिती मिळाली. थेट पीक, हवामान आणि बाजार माहिती जोडलेली नसल्यामुळे सध्या शेत-विशिष्ट विश्लेषण दाखवलेले नाही.', readyListTitle:'KrishiLens कोणती माहिती एकत्र आणण्यासाठी तयार आहे', readyCrop:'पीक स्थिती', readyCropD:'उपग्रह निरीक्षणे आणि हवामान संदर्भ', readyYield:'अपेक्षित उत्पादन आणि कापणी कालावधी', readyYieldD:'विश्वास पातळीसह अंदाज श्रेणी आणि अनिश्चितता', readyMarket:'बाजार माहिती', readyMarketD:'जवळच्या बाजारातील किंमत कल, आवक आणि विक्रीचा अंदाज', farmSummary:'तुमच्या शेताची माहिती', edit:'शेताची माहिती बदला', overview:'KrishiLens कशी मदत करते', readyDisclaimer:'या नमुन्यात प्रत्यक्ष विश्लेषण किंवा अंदाज तयार होत नाही. प्रमाणित माहिती स्रोत जोडल्यावर निकाल उपलब्ध होतील.'
 },
 hi: {
  logo:'फसल से बाज़ार तक निर्णय सहायता', signout:'साइन आउट', farmerCaption:'मोबाइल पर फसल की जानकारी देखते किसान', welcomeKicker:'अपने खेत को बेहतर समझें', welcomeTitle:'खेत में क्या हो रहा है और आगे किस बात पर ध्यान देना है—जानें।', welcomeBody:'KrishiLens फसल की स्थिति, मौसम, संभावित कटाई और स्थानीय बाज़ार की जानकारी को एक जगह लाता है, ताकि आप बेहतर जानकारी के साथ निर्णय ले सकें।', step1:'फसल की स्थिति समझें', step1d:'फसल वृद्धि के संकेत और मौसम का संदर्भ सरल भाषा में देखें।', step2:'कटाई की योजना बनाएँ', step2d:'विश्वास स्तर के साथ संभावित उपज सीमा और कटाई अवधि देखें।', step3:'बाज़ार विकल्पों की तुलना करें', step3d:'आस-पास के भाव, आवक और बिक्री का नज़रिया साथ में देखें।', analyze:'अपनी फसल का विश्लेषण करें', time:'खेत की जानकारी भरें · लगभग २ मिनट', trust:'अनुमान निर्णय में मदद करते हैं, गारंटी नहीं। डेमो में खेत की जानकारी इसी सत्र तक सीमित रहती है।',
  formKicker:'आपका खेत · चरण १ में १', formTitle:'जिस फसल का विश्लेषण चाहते हैं उसकी जानकारी दें', formBody:'वह खेत चुनें जिसके लिए जानकारी चाहिए। स्थान लिखें या डिवाइस का स्थान साझा करें।', farmLocation:'खेत का स्थान या गाँव', farmPlaceholder:'गाँव या खेत का इलाका', taluka:'तालुका', talukaPlaceholder:'तालुका लिखें', liveLocation:'खेत का लाइव स्थान', liveHelp:'खेत पर रहते हुए डिवाइस का स्थान इस्तेमाल करें। इस डेमो में यह सर्वर पर नहीं भेजा जाता।', locate:'मेरा लाइव स्थान इस्तेमाल करें', locating:'स्थान लिया जा रहा है…', located:'इस डिवाइस पर स्थान मिल गया', denied:'स्थान उपलब्ध नहीं। ऊपर दर्ज स्थान के साथ आगे बढ़ सकते हैं।', unavailable:'इस डिवाइस पर स्थान सुविधा उपलब्ध नहीं है।', crop:'बोई गई फसल', chooseCrop:'फसल चुनें', soybean:'सोयाबीन', cotton:'कपास', maize:'मक्का', sugarcane:'गन्ना', paddy:'धान', other:'अन्य फसल', otherCrop:'फसल का नाम लिखें', harvestDate:'कटाई की तारीख (अनुमानित या वास्तविक)', harvestHint:'फसल की कटाई नहीं हुई है तो अपनी अनुमानित तारीख लिखें। यह आपकी जानकारी है, भविष्यवाणी नहीं।', sowingDate:'बुवाई की तारीख (वैकल्पिक)', back:'वापस', submit:'जारी रखें', formNote:'इस प्रोटोटाइप में उपग्रह, मौसम या बाज़ार विश्लेषण नहीं चलता। आपके खेत के लिए मनगढ़ंत नतीजे नहीं दिखेंगे।',
  readyKicker:'खेत की जानकारी मिल गई', readyTitle:'आपकी फसल विश्लेषण के लिए तैयार है', readyBody:'इस डेमो सत्र के लिए खेत की जानकारी मिल गई है। लाइव फसल, मौसम और बाज़ार डेटा जुड़ा नहीं है, इसलिए अभी खेत-विशेष विश्लेषण नहीं दिखाया गया है।', readyListTitle:'KrishiLens किन जानकारियों को जोड़ने के लिए बनाया गया है', readyCrop:'फसल की स्थिति', readyCropD:'उपग्रह अवलोकन और मौसम का संदर्भ', readyYield:'संभावित उपज और कटाई अवधि', readyYieldD:'विश्वास स्तर और अनिश्चितता के साथ अनुमानित सीमा', readyMarket:'बाज़ार की जानकारी', readyMarketD:'आस-पास के भाव, आवक और बिक्री का नज़रिया', farmSummary:'आपके खेत की जानकारी', edit:'खेत की जानकारी बदलें', overview:'KrishiLens कैसे मदद करता है', readyDisclaimer:'यह प्रोटोटाइप वास्तविक विश्लेषण या भविष्यवाणी नहीं करता। सत्यापित डेटा स्रोत जुड़ने पर नतीजे उपलब्ध होंगे।'
 }
}

export function WelcomeScreen({name,language,onAnalyze,onWorkspace,onSignOut}) {
 const t=copy[language]||copy.en
 return <main className="flow-page" lang={language}><header className="flow-header"><a className="flow-brand"><span><Sprout size={18}/></span><b>KrishiLens</b><small>{t.logo}</small></a><div className="flow-user"><span>{name}</span><button onClick={onSignOut}><LogOut size={15}/>{t.signout}</button></div></header><section className="flow-welcome"><div className="flow-welcome-copy"><div className="flow-greeting">Welcome, {name.split(' ')[0]}</div><div className="flow-kicker"><span/><span>{t.welcomeKicker}</span></div><h1>{t.welcomeTitle}</h1><p>{t.welcomeBody}</p><div className="flow-actions"><button className="flow-primary" onClick={onAnalyze}>{t.analyze}<ArrowRight size={17}/></button>{onWorkspace&&<button className="button button-outline flow-alt-btn" onClick={onWorkspace}>Explore demo workspace <ArrowRight size={15}/></button>}<span><Check size={14}/>{t.time}</span></div></div><div className="flow-graphic"><div className="flow-ring ring-a"/><div className="flow-ring ring-b"/><div className="flow-center"><Sprout size={34}/></div><span className="flow-graphic-label"><Leaf size={14}/>{t.logo}</span><span className="flow-graphic-dot dot-a"/><span className="flow-graphic-dot dot-b"/><span className="flow-graphic-dot dot-c"/></div></section><section className="flow-benefits"><article><span className="flow-benefit-icon"><Leaf size={18}/></span><small>01</small><h2>{t.step1}</h2><p>{t.step1d}</p></article><article><span className="flow-benefit-icon"><CalendarDays size={18}/></span><small>02</small><h2>{t.step2}</h2><p>{t.step2d}</p></article><article><span className="flow-benefit-icon"><TrendingUp size={18}/></span><small>03</small><h2>{t.step3}</h2><p>{t.step3d}</p></article></section><footer className="flow-footer"><ShieldCheck size={16}/><span>{t.trust}</span><span className="flow-footer-brand">KrishiLens · {t.logo}</span></footer></main>
}

export function CropIntake({language,onBack,onSubmit}) {
 const t=copy[language]||copy.en
 const [gps,setGps]=useState(null),[geoStatus,setGeoStatus]=useState('idle'),[crop,setCrop]=useState('')
 const locate=()=>{if(!navigator.geolocation){setGeoStatus('unavailable');return}setGeoStatus('loading');navigator.geolocation.getCurrentPosition(({coords})=>{setGps({latitude:coords.latitude,longitude:coords.longitude});setGeoStatus('located')},()=>setGeoStatus('denied'),{enableHighAccuracy:true,timeout:12000,maximumAge:0})}
 const submit=e=>{e.preventDefault();const values=Object.fromEntries(new FormData(e.currentTarget).entries());onSubmit({...values,crop:values.crop==='other'?values.otherCrop:values.crop,gps})}
 return <main className="intake-page" lang={language}>
  <header className="flow-header">
   <a className="flow-brand"><span><Sprout size={18}/></span><b>KrishiLens</b><small>{t.logo}</small></a>
   <button className="flow-back" onClick={onBack}><ArrowLeft size={15}/>{t.back}</button>
  </header>
  <div className="intake-layout">
   <section className="intake-intro">
    <div className="flow-kicker"><span className="kicker-dot"/><span>{t.formKicker}</span></div>
    <h1>{t.formTitle}</h1>
    <p>{t.formBody}</p>
    <div className="intake-steps">
     <div className="intake-step">
      <span className="intake-step-number">1</span>
      <div><b>{t.farmLocation}</b><small>{t.taluka} · {t.liveLocation}</small></div>
     </div>
     <div className="intake-step">
      <span className="intake-step-number">2</span>
      <div><b>{t.crop}</b><small>{t.harvestDate}</small></div>
     </div>
    </div>
    <div className="intake-assurance"><ShieldCheck size={18}/><span>{t.formNote}</span></div>
    <div className="intake-illustration">
     <img src={farmerIllustration} alt={t.farmerCaption || 'Farmer analyzing crops on laptop in field'} />
    </div>
   </section>
   <section className="intake-card">
    <form onSubmit={submit}>
     <div className="intake-card-head">
      <span className="eyebrow">{t.formKicker}</span>
      <h2>{t.formTitle}</h2>
     </div>
     <label className="intake-field">
      <span>{t.farmLocation} <i>*</i></span>
      <div className="intake-input"><MapPin size={16}/><input name="farmLocation" required autoComplete="off" placeholder={t.farmPlaceholder}/></div>
     </label>
     <label className="intake-field">
      <span>{t.taluka} <i>*</i></span>
      <div className="intake-input"><Compass size={16}/><input name="taluka" required autoComplete="off" placeholder={t.talukaPlaceholder}/></div>
     </label>
     <div className="gps-box">
      <div className="gps-copy">
       <span className="gps-icon"><Crosshair size={16}/></span>
       <span><b>{t.liveLocation}</b><small>{t.liveHelp}</small></span>
      </div>
      <button className="gps-button" type="button" onClick={locate} disabled={geoStatus==='loading'}>{geoStatus==='loading'?t.locating:t.locate}</button>
      {gps&&<div className="gps-success"><Check size={13}/>{t.located} · {gps.latitude.toFixed(5)}, {gps.longitude.toFixed(5)}</div>}
      {['denied','unavailable'].includes(geoStatus)&&<div className="gps-message">{geoStatus==='denied'?t.denied:t.unavailable}</div>}
     </div>
     <label className="intake-field">
      <span>{t.crop} <i>*</i></span>
      <div className="intake-input select-wrap">
       <Leaf size={16}/>
       <select name="crop" required value={crop} onChange={e=>setCrop(e.target.value)}>
        <option value="">{t.chooseCrop}</option>
        <option value="Soybean">{t.soybean}</option>
        <option value="Cotton">{t.cotton}</option>
        <option value="Maize">{t.maize}</option>
        <option value="Sugarcane">{t.sugarcane}</option>
        <option value="Paddy">{t.paddy}</option>
        <option value="other">{t.other}</option>
       </select>
       <ChevronDown size={15} className="select-arrow"/>
      </div>
     </label>
     {crop==='other'&&<label className="intake-field">
      <span>{t.otherCrop} <i>*</i></span>
      <div className="intake-input"><Sprout size={16}/><input name="otherCrop" required placeholder={t.otherCrop}/></div>
     </label>}
     <label className="intake-field">
      <span>{t.harvestDate} <i>*</i></span>
      <div className="intake-input"><CalendarDays size={16}/><input name="harvestDate" required type="date"/></div>
      <small className="field-hint">{t.harvestHint}</small>
     </label>
     <label className="intake-field optional-field">
      <span>{t.sowingDate}</span>
      <div className="intake-input"><CalendarDays size={16}/><input name="sowingDate" type="date"/></div>
     </label>
     <div className="intake-card-foot">
      <button type="button" className="text-back" onClick={onBack}><ArrowLeft size={14}/>{t.back}</button>
      <button type="submit" className="flow-primary">{t.submit}<ArrowRight size={16}/></button>
     </div>
    </form>
   </section>
  </div>
 </main>
}

const cropGrowthData = [
  { id: '1', month: 'June', growth: 18, name: 'June' },
  { id: '2', month: '', growth: 27, name: 'Late June' },
  { id: '3', month: 'July', growth: 37, name: 'July' },
  { id: '4', month: '', growth: 42, name: 'Late July' },
  { id: '5', month: 'August', growth: 54, name: 'August' },
  { id: '6', month: '', growth: 62, name: 'Late August' },
  { id: '7', month: 'September', growth: 69, name: 'September' },
  { id: '8', month: '', growth: 74, name: 'Late September' },
  { id: '9', month: 'October', growth: 78, name: 'October' }
]

const cropMonitoringText = {
  en: {
    kicker: 'CROP MONITORING',
    title: 'How is your crop doing?',
    subtitle: "A simple view of your crop's condition and progress.",
    overallTitle: 'OVERALL CROP HEALTH',
    goodCondition: 'GOOD CONDITION',
    score: '78',
    signalLabel: 'Healthy vegetation signal',
    explanation: 'Satellite observations indicate healthy vegetation activity compared with the expected crop growth pattern.',
    chartTitle: 'Crop growth over time',
    chartSubtitle: 'June to October',
    legend: 'Your crop',
    whatWeSee: 'WHAT WE SEE',
    mainStatement: 'Your crop is progressing normally.',
    statementSub: 'No major abnormal crop signal has been detected in the latest observation.',
    signals: [
      'Healthy vegetation signal',
      'Growth pattern is progressing normally',
      'No major abnormal signal detected'
    ],
    techDetails: 'Technical details',
    techSub: 'For those who want to see the underlying signal',
    techItems: [
      { label: 'Satellite observation context', value: 'Multi-spectral satellite optical observation composite' },
      { label: 'Vegetation signal', value: 'NDVI canopy reflectance within standard expected parameters' },
      { label: 'Growth trend', value: 'Consistent upward progression matching regional Kharif crop calendar' },
      { label: 'Observation period', value: 'Rolling 15-day composite · June to October 2026' }
    ],
    nextLabel: 'NEXT',
    nextText: 'See how much you could harvest',
    nextCta: 'VIEW YIELD FORECAST',
    notLive: 'Prototype crop-health view. Live farm-specific analysis is not connected yet.'
  },
  mr: {
    kicker: 'पीक देखरेख',
    title: 'तुमचे पीक कसे आहे?',
    subtitle: 'तुमच्या पिकाची स्थिती आणि वाढीचा सोपा आढावा.',
    overallTitle: 'पिकाचे एकूण आरोग्य',
    goodCondition: 'उत्तम स्थिती',
    score: '७८',
    signalLabel: 'निरोगी वनस्पती संकेत',
    explanation: 'उपग्रह निरीक्षणे दर्शवतात की पिकाची वाढ अपेक्षित वाढीच्या पद्धतीनुसार निरोगी आणि समाधानकारक आहे.',
    chartTitle: 'कालावधीनुसार पिकाची वाढ',
    chartSubtitle: 'जून ते ऑक्टोबर',
    legend: 'तुमचे पीक',
    whatWeSee: 'आम्हाला काय दिसते',
    mainStatement: 'तुमच्या पिकाची प्रगती सामान्यपणे होत आहे.',
    statementSub: 'नुकत्याच झालेल्या निरीक्षणात कोणताही मोठा असामान्य पीक संकेत आढळलेला नाही.',
    signals: [
      'निरोगी वनस्पती संकेत',
      'पिकाची वाढ सामान्य रीतीने प्रगती करत आहे',
      'कोणताही मोठा असामान्य संकेत आढळला नाही'
    ],
    techDetails: 'तांत्रिक तपशील',
    techSub: 'ज्यांना अंतर्निहित संकेत पाहायचा आहे त्यांच्यासाठी',
    techItems: [
      { label: 'उपग्रह निरीक्षण संदर्भ', value: 'मल्टी-स्पेक्ट्रल उपग्रह ऑप्टिकल निरीक्षण संमिश्र' },
      { label: 'वनस्पती संकेत', value: 'NDVI निर्देशांक सामान्य अपेक्षित मर्यादेत' },
      { label: 'वाढ कल', value: 'पेरणीपासून सातत्यपूर्ण सकारात्मक बायोमास वाढ' },
      { label: 'निरीक्षण कालावधी', value: '१५-दिवसांचे संमिश्र · जून ते ऑक्टोबर २०२६' }
    ],
    nextLabel: 'पुढील पायरी',
    nextText: 'तुम्ही किती उत्पादन घेऊ शकता ते पहा',
    nextCta: 'उत्पादन अंदाज पहा',
    notLive: 'नमुना पीक-आरोग्य दृश्य. थेट शेत-विशिष्ट विश्लेषण अद्याप जोडलेले नाही.'
  },
  hi: {
    kicker: 'फसल निगरानी',
    title: 'आपकी फसल कैसी है?',
    subtitle: 'आपकी फसल की स्थिति और प्रगति का एक सरल दृश्य।',
    overallTitle: 'फसल का समग्र स्वास्थ्य',
    goodCondition: 'अच्छी स्थिति',
    score: '78',
    signalLabel: 'स्वस्थ वनस्पति संकेत',
    explanation: 'उपग्रह अवलोकन इंगित करते हैं कि अपेक्षित फसल वृद्धि पैटर्न की तुलना में वनस्पति गतिविधि स्वस्थ है।',
    chartTitle: 'समय के साथ फसल की वृद्धि',
    chartSubtitle: 'जून से अक्टूबर',
    legend: 'आपकी फसल',
    whatWeSee: 'हम क्या देख रहे हैं',
    mainStatement: 'आपकी फसल सामान्य रूप से प्रगति कर रही है।',
    statementSub: 'नवीनतम अवलोकन में कोई बड़ा असामान्य फसल संकेत नहीं पाया गया है।',
    signals: [
      'स्वस्थ वनस्पति संकेत',
      'वृद्धि पैटर्न सामान्य रूप से आगे बढ़ रहा है',
      'कोई बड़ा असामान्य संकेत नहीं मिला'
    ],
    techDetails: 'तकनीकी विवरण',
    techSub: 'उन लोगों के लिए जो अंतर्निहित संकेत देखना चाहते हैं',
    techItems: [
      { label: 'उपग्रह अवलोकन संदर्भ', value: 'मल्टी-स्पेक्ट्रल उपग्रह ऑप्टिकल अवलोकन कंपोजिट' },
      { label: 'वनस्पति संकेत', value: 'NDVI विन्यास मानक अपेक्षित सीमा के भीतर' },
      { label: 'वृद्धि रुझान', value: 'बुवाई के बाद से निरंतर सकारात्मक बायोमास प्रगति' },
      { label: 'अवलोकन अवधि', value: '15-दिवसीय रोलिंग कंपोजिट · जून से अक्टूबर 2026' }
    ],
    nextLabel: 'अगला कदम',
    nextText: 'देखें कि आप कितनी फसल काट सकते हैं',
    nextCta: 'उपज पूर्वानुमान देखें',
    notLive: 'प्रोटोटाइप फसल-स्वास्थ्य दृश्य। लाइव खेत-विशिष्ट विश्लेषण अभी जुड़ा नहीं है।'
  }
}

function CropChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload
  return (
    <div className="crop-chart-tip">
      <strong>{point.name || label || 'Observation'}</strong>
      <span>Relative crop index: <b>{payload[0].value}%</b></span>
    </div>
  )
}

function CropMonitoringDetail({ farm, language, onBack, onNavigateYield, onEdit, onWorkspace, copyText, resultText }) {
  const [showTech, setShowTech] = useState(false)
  const m = cropMonitoringText[language] || cropMonitoringText.en

  return (
    <div className="crop-monitoring-view">
      <div className="results-detail-top">
        <button type="button" className="text-back" onClick={onBack}>
          <ArrowLeft size={15} /> {resultText.back}
        </button>
        <span className="results-demo">{resultText.demo}</span>
      </div>

      <div className="crop-monitoring-heading">
        <div className="flow-kicker">
          <span />
          {m.kicker}
        </div>
        <h1 className="crop-monitoring-title">{m.title}</h1>
        <p className="crop-monitoring-subtitle">{m.subtitle}</p>
      </div>

      {/* Main Crop Health Card */}
      <section className="crop-health-card">
        {/* Left Side: Overall Crop Health */}
        <div className="crop-health-left">
          <div className="crop-health-topline">
            <span className="crop-health-eyebrow">{m.overallTitle}</span>
          </div>

          <div className="crop-status-pill">
            <span className="crop-status-dot" />
            <span>{m.goodCondition}</span>
          </div>

          <div className="crop-score-wrap">
            <div className="crop-score-row">
              <span className="crop-score-val">{m.score}</span>
              <span className="crop-score-pct">%</span>
            </div>
            <div className="crop-score-label">{m.signalLabel}</div>
          </div>

          <div
            className="crop-progress-track"
            role="progressbar"
            aria-valuenow={78}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall crop health 78 percent"
          >
            <div className="crop-progress-fill" style={{ width: '78%' }} />
          </div>

          <p className="crop-health-explanation">{m.explanation}</p>
        </div>

        {/* Right Side: Crop Growth Over Time Chart */}
        <div className="crop-health-right">
          <div className="crop-chart-head">
            <div>
              <h3 className="crop-chart-title">{m.chartTitle}</h3>
              <span className="crop-chart-sub">{m.chartSubtitle}</span>
            </div>
            <span className="crop-chart-legend">
              <i className="legend-dot" /> {m.legend}
            </span>
          </div>

          <div className="crop-chart-canvas">
            <ResponsiveContainer width="100%" height={235}>
              <AreaChart data={cropGrowthData} margin={{ top: 16, right: 24, left: 16, bottom: 4 }}>
                <defs>
                  <linearGradient id="cropAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2e7d32" stopOpacity={0.24} />
                    <stop offset="65%" stopColor="#2e7d32" stopOpacity={0.06} />
                    <stop offset="100%" stopColor="#2e7d32" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  tick={{ fill: '#73836f', fontSize: 12, fontWeight: 500 }}
                  dy={8}
                />
                <Tooltip content={<CropChartTip />} />
                <Area
                  type="monotone"
                  dataKey="growth"
                  stroke="#236838"
                  strokeWidth={2.75}
                  fill="url(#cropAreaGradient)"
                  activeDot={{ r: 6, fill: '#236838', stroke: '#ffffff', strokeWidth: 2.5 }}
                  dot={(props) => {
                    const { cx, cy, index } = props
                    if (index === cropGrowthData.length - 1) {
                      return (
                        <g key="october-dot">
                          <circle cx={cx} cy={cy} r={6.5} fill="#236838" stroke="#ffffff" strokeWidth={2.5} />
                          <circle cx={cx} cy={cy} r={2.5} fill="#ffffff" />
                        </g>
                      )
                    }
                    return null
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* "What We See" Section */}
      <section className="crop-what-we-see">
        <div className="crop-see-left">
          <span className="crop-see-eyebrow">{m.whatWeSee}</span>
          <h2 className="crop-see-title">{m.mainStatement}</h2>
          <p className="crop-see-desc">{m.statementSub}</p>
        </div>
        <div className="crop-see-right">
          {m.signals.map((sig, idx) => (
            <div className="crop-see-item" key={idx}>
              <span className="crop-check-badge">
                <Check size={13} strokeWidth={2.8} />
              </span>
              <span className="crop-see-text">{sig}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Details Accordion */}
      <section className="crop-tech-accordion">
        <button
          type="button"
          className="crop-tech-header"
          onClick={() => setShowTech(!showTech)}
          aria-expanded={showTech}
        >
          <div className="crop-tech-title-group">
            <span className="crop-tech-icon-box">
              <Info size={16} />
            </span>
            <div>
              <strong className="crop-tech-title">{m.techDetails}</strong>
              <p className="crop-tech-subtitle">{m.techSub}</p>
            </div>
          </div>
          <span className="crop-tech-toggle-icon" aria-hidden="true">
            {showTech ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </button>

        {showTech && (
          <div className="crop-tech-content">
            <div className="crop-tech-grid">
              {m.techItems.map((item, idx) => (
                <div className="crop-tech-cell" key={idx}>
                  <span className="crop-tech-cell-label">{item.label}</span>
                  <span className="crop-tech-cell-val">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Next Step Section */}
      <section className="crop-next-card">
        <div className="crop-next-left">
          <span className="crop-next-kicker">{m.nextLabel}</span>
          <h3 className="crop-next-prompt">{m.nextText}</h3>
        </div>
        <button
          type="button"
          className="flow-primary crop-next-button"
          onClick={onNavigateYield}
        >
          {m.nextCta} <ArrowRight size={16} />
        </button>
      </section>

      {/* Footer Disclaimer & Actions */}
      <footer className="results-footer">
        <ShieldCheck size={16} />
        <span>{m.notLive}</span>
        <div>
          <button type="button" className="button button-outline" onClick={onEdit}>
            {copyText.edit}
          </button>
          {onWorkspace && (
            <button type="button" className="flow-primary" onClick={onWorkspace}>
              Enter demo workspace <ArrowRight size={15} />
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}

const resultText={
 en:{kicker:'YOUR FARM OVERVIEW',title:'Your farm, in focus',intro:'Choose an area to explore. This demo does not connect to live crop, weather or market data.',crop:'Field signals and crop checks',yield:'Harvest planning and estimate factors',market:'Compare local selling conditions',back:'Back to overview',demo:'How this insight works',notLive:'Live analysis is not connected in this prototype. No farm-specific result or prediction is being shown.',festival:'Seasonal calendar context',festivalText:'Dussehra / Vijayadashami is around 20 October 2026 and Diwali is on 8 November 2026. Festival dates are context only; they do not guarantee demand or higher prices.',factors:['Modal price','Minimum / maximum price','Market arrivals','Recent price trend','Distance and logistics','Data quality']},
 mr:{kicker:'तुमच्या शेताचा आढावा',title:'तुमचे शेत, एका नजरेत',intro:'माहिती पाहण्यासाठी विभाग निवडा. या डेमोमध्ये थेट पीक, हवामान किंवा बाजार माहिती जोडलेली नाही.',crop:'शेतातील संकेत आणि पीक तपासणी',yield:'कापणीचे नियोजन आणि अंदाजाचे घटक',market:'स्थानिक विक्री परिस्थितीची तुलना',back:'आढाव्यावर परत',demo:'ही माहिती कशी उपयोगी ठरते',notLive:'या नमुन्यात थेट विश्लेषण जोडलेले नाही. शेत-विशिष्ट निकाल किंवा अंदाज दाखवले जात नाहीत.',festival:'हंगामी दिनदर्शिका संदर्भ',festivalText:'दसरा / विजयादशमी साधारण २० ऑक्टोबर २०२६ आणि दिवाळी ८ नोव्हेंबर २०२६ रोजी आहे. या तारखा केवळ संदर्भ आहेत; मागणी किंवा जास्त भावाची हमी नाही.',factors:['सर्वसाधारण भाव','किमान / कमाल भाव','बाजारातील आवक','अलीकडील किंमत कल','अंतर व वाहतूक','माहितीची गुणवत्ता']},
 hi:{kicker:'आपके खेत का सार',title:'आपका खेत, एक नज़र में',intro:'जानकारी देखने के लिए अनुभाग चुनें। इस डेमो में लाइव फसल, मौसम या बाज़ार डेटा जुड़ा नहीं है।',crop:'खेत के संकेत और फसल की जाँच',yield:'कटाई की योजना और अनुमान के कारक',market:'स्थानीय बिक्री स्थितियों की तुलना',back:'सार पर वापस',demo:'यह जानकारी कैसे काम आती है',notLive:'इस प्रोटोटाइप में लाइव विश्लेषण जुड़ा नहीं है। खेत-विशेष नतीजे या भविष्यवाणी नहीं दिखाई जा रही है।',festival:'मौसमी कैलेंडर संदर्भ',festivalText:'दशहरा / विजयादशमी लगभग 20 अक्टूबर 2026 और दिवाली 8 नवंबर 2026 को हैं। ये तारीखें केवल संदर्भ हैं; मांग या बेहतर भाव की गारंटी नहीं।',factors:['मॉडल भाव','न्यूनतम / अधिकतम भाव','मंडी आवक','हाल का भाव रुझान','दूरी और परिवहन','डेटा गुणवत्ता']}
}

export function AnalysisReady({language,farm,onEdit,onOverview,onWorkspace,onSignOut}) {
 const t=copy[language]||copy.en, x=resultText[language]||resultText.en, [active,setActive]=useState('overview')
 useEffect(()=>{window.scrollTo(0,0)},[active])
 const items=[{id:'crop',icon:Activity,title:t.readyCrop,sub:x.crop,body:t.readyCropD},{id:'yield',icon:CalendarDays,title:t.readyYield,sub:x.yield,body:t.readyYieldD},{id:'market',icon:TrendingUp,title:t.readyMarket,sub:x.market,body:t.readyMarketD}]
 const date=new Date(`${farm.harvestDate}T12:00:00`), dateLabel=Number.isNaN(date.getTime())?farm.harvestDate:new Intl.DateTimeFormat(language==='mr'?'mr-IN':language==='hi'?'hi-IN':'en-IN',{dateStyle:'medium'}).format(date)
 const cropLabel=farm.crop==='Soybean'?t.soybean:farm.crop==='Cotton'?t.cotton:farm.crop==='Maize'?t.maize:farm.crop==='Sugarcane'?t.sugarcane:farm.crop==='Paddy'?t.paddy:farm.crop
 return <main className="results-page" lang={language}>
  <header className="results-header"><a className="flow-brand"><span><Sprout size={18}/></span><b>KrishiLens</b><small>{t.logo}</small></a><div className="flow-user"><span>{farm.farmLocation}, {farm.taluka}</span><button onClick={onSignOut}><LogOut size={15}/>{t.signout}</button></div></header>
  <div className="results-content">{active==='overview'?<>
   <section className="results-hero"><div className="results-copy"><div className="flow-kicker"><span/>{x.kicker}</div><h1>{x.title}</h1><p>{x.intro}</p><div className="results-tags"><span><MapPin size={15}/>{farm.farmLocation}, {farm.taluka}</span><span><Leaf size={15}/>{cropLabel}</span><span><CalendarDays size={15}/>{dateLabel}</span>{farm.gps&&<span><Crosshair size={15}/>{farm.gps.latitude.toFixed(4)}, {farm.gps.longitude.toFixed(4)}</span>}</div><div className="results-cards">{items.map(item=><button className="results-card" key={item.id} onClick={()=>setActive(item.id)}><span className="results-icon"><item.icon size={19}/></span><span><b>{item.title}</b><small>{item.sub}</small></span><ArrowRight size={17}/></button>)}</div></div><div className="results-character"><FarmerFigure caption={t.farmerCaption}/></div></section>
  <footer className="results-footer"><ShieldCheck size={16}/><span>{t.readyDisclaimer}</span><div><button className="text-back" onClick={onOverview}><ArrowLeft size={14}/>{t.overview}</button><button className="button button-outline" onClick={onEdit}>{t.edit}</button>{onWorkspace&&<button className="flow-primary" onClick={onWorkspace}>Enter demo workspace <ArrowRight size={15}/></button>}</div></footer>
 </>:active==='crop'?<CropMonitoringDetail farm={farm} language={language} onBack={()=>setActive('overview')} onNavigateYield={()=>setActive('yield')} onEdit={onEdit} onWorkspace={onWorkspace} copyText={t} resultText={x} />:<>
  <div className="results-detail-top"><button className="text-back" onClick={()=>setActive('overview')}><ArrowLeft size={15}/>{x.back}</button><span className="results-demo">{x.demo}</span></div><div className="results-detail-heading"><div className="flow-kicker"><span/>{x.kicker}</div><h1>{items.find(item=>item.id===active)?.title}</h1><p>{items.find(item=>item.id===active)?.body}</p></div>
  {active==='market'?<div className="results-detail-grid"><article className="results-detail-card"><div className="eyebrow">{t.farmSummary}</div><p>{t.readyMarketD}</p><div className="results-factors">{x.factors.map((factor,index)=><span key={factor}><i>0{index+1}</i>{factor}</span>)}</div></article><article className="results-detail-card"><div className="eyebrow">{x.festival}</div><p>{x.festivalText}</p></article></div>:<div className="results-detail-grid"><article className="results-detail-card"><div className="eyebrow">{t.farmSummary}</div><h2>{items.find(item=>item.id===active)?.title}</h2><p>{items.find(item=>item.id===active)?.body}</p></article><article className="results-detail-card results-notice"><ShieldCheck size={20}/><p>{x.notLive}</p></article></div>}
  <footer className="results-footer"><ShieldCheck size={16}/><span>{x.notLive}</span><div><button className="button button-outline" onClick={onEdit}>{t.edit}</button>{onWorkspace&&<button className="flow-primary" onClick={onWorkspace}>Enter demo workspace <ArrowRight size={15}/></button>}</div></footer>
 </>}</div>
</main>
}

