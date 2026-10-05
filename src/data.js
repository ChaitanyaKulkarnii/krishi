export const farm = { location: 'Sangli, Maharashtra', crop: 'Soybean', area: '2 hectares', sowing: 'June 2026', season: 'Kharif 2026' }
export const yieldInfo = { range: '2.3–2.7', unit: 't/ha', confidence: 'Moderate', regional: '2.1 t/ha', harvest: 'Early – Mid October' }
export const ndvi = [
  { month:'Jun 12', value:0.24 }, { month:'Jun 28', value:0.31 }, { month:'Jul 14', value:0.46 }, { month:'Jul 30', value:0.59 }, { month:'Aug 15', value:0.68 }, { month:'Aug 31', value:0.72 }, { month:'Sep 16', value:0.67 }, { month:'Oct 02', value:0.61 },
]
export const weather = [
  { week:'Aug 1', rainfall:24, temp:29 }, { week:'Aug 8', rainfall:38, temp:28 }, { week:'Aug 15', rainfall:19, temp:30 }, { week:'Aug 22', rainfall:31, temp:29 }, { week:'Aug 29', rainfall:14, temp:31 }, { week:'Sep 5', rainfall:22, temp:29 }, { week:'Sep 12', rainfall:18, temp:30 }, { week:'Sep 19', rainfall:12, temp:31 },
]
export const prices7 = [ {day:'Sep 26',price:4620},{day:'Sep 27',price:4650},{day:'Sep 28',price:4610},{day:'Sep 29',price:4690},{day:'Sep 30',price:4720},{day:'Oct 1',price:4680},{day:'Oct 2',price:4760} ]
export const prices30 = ['4 Sep','6 Sep','8 Sep','10 Sep','12 Sep','14 Sep','16 Sep','18 Sep','20 Sep','22 Sep','24 Sep','26 Sep','28 Sep','30 Sep','2 Oct'].map((day,i)=>({day,price:[4380,4420,4390,4510,4470,4560,4520,4610,4550,4680,4610,4720,4650,4690,4760][i]}))
export const markets = [
 {name:'Sangli APMC', distance:'12 km', price:4760, change:'+2.4%', arrivals:'184 t', quality:'Good', trend:'up'},
 {name:'Tasgaon APMC', distance:'28 km', price:4725, change:'+1.1%', arrivals:'126 t', quality:'Good', trend:'up'},
 {name:'Miraj APMC', distance:'34 km', price:4680, change:'−0.3%', arrivals:'208 t', quality:'Moderate', trend:'flat'},
 {name:'Kolhapur APMC', distance:'51 km', price:4810, change:'+0.8%', arrivals:'96 t', quality:'Partial', trend:'up'},
]
export const factors = ['Harvest window is approaching','Recent prices are comparatively favorable','Market direction is being monitored','Available data quality supports a moderate-confidence outlook']
