/**
 * Photos used on the site, all from Wikimedia Commons under free licences.
 * Attribution is shown on /credits/ (required by CC BY / CC BY-SA).
 * To use your own photos instead, replace the files in public/images/ and edit the entry here.
 */

const CC = {
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
  'Public domain': null,
}

const photo = (id, folder, file, author, license, focus = 'attention') => ({
  id,
  folder,
  file,
  author,
  license,
  licenseUrl: CC[license],
  source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(file.replace(/ /g, '_'))}`,
  focus,
})

export const PHOTOS = {
  swift: photo('swift', 'cars', 'File:2020 Suzuki Swift Facelift IMG 1884.jpg', 'Alexander-93', 'CC BY-SA 4.0'),
  dzire: photo('dzire', 'cars', 'File:Maruti Suzuki Dzire VXi VVT - Subcompact Car - Kolkata 2018-01-17 7575.JPG', 'Biswarup Ganguly', 'CC BY 3.0'),
  creta: photo('creta', 'cars', 'File:2024 Hyundai Creta 1.5 MPi SX(O) (India) front view.png', 'CARS WORLD Kannada', 'CC BY 3.0'),
  thar: photo('thar', 'cars', 'File:Mahindra Thar Photoshoot at Perupalem Beach (West Godavari District, AP, India) Djdavid.jpg', 'DjDavid1998', 'CC BY-SA 4.0'),
  ertiga: photo('ertiga', 'cars', 'File:2022 Maruti Suzuki Ertiga LXi.jpg', 'Ramakrishna Mission Vidyapith', 'Public domain'),
  innova: photo('innova', 'cars', 'File:Toyota Innova Crysta 2.4 Z front right.jpg', 'Premnath Kudva', 'CC BY-SA 4.0'),

  alwar: photo('alwar', 'places', 'File:Sagar (pond) view from Moosi Maharani ki Chhatri, Alwar 09.jpg', 'Vkvikas3', 'CC BY-SA 4.0', 'centre'),
  'bala-quila': photo('bala-quila', 'places', 'File:Alwar fort or Bala Quila 09.jpg', 'Pinakpani', 'CC BY-SA 4.0', 'centre'),
  siliserh: photo('siliserh', 'places', 'File:Siliserh Lake,Alwar 3.jpg', 'VijaykumarGGaikwad', 'CC BY-SA 4.0', 'centre'),
  sariska: photo('sariska', 'places', 'File:Deer in Sariska Reserve.jpg', 'Dan Lundberg', 'CC BY-SA 2.0', 'centre'),
  bhangarh: photo('bhangarh', 'places', 'File:Bhangarh Fort Entrance.JPG', 'Navjot Singh', 'CC BY-SA 3.0', 'centre'),
  neemrana: photo('neemrana', 'places', 'File:Neemrana Fort and the Palace Hotel.jpg', 'Abhinav Swara', 'CC BY-SA 2.0', 'centre'),
  jaipur: photo('jaipur', 'places', 'File:Amer Fort - Jaipur - Rajasthan.jpg', 'Bibinca', 'CC BY-SA 4.0', 'centre'),
  delhi: photo('delhi', 'places', 'File:India Gate, New Delhi from West.jpg', 'Nikhilb239', 'CC BY-SA 4.0', 'centre'),
}

export const PHOTO_WIDTHS = [640, 1024, 1600]
export const PHOTO_RATIO = 3 / 2

export const photoSrc = (id, width, ext) => `/images/${PHOTOS[id].folder}/${id}-${width}.${ext}`
export const ogImageFor = (id) => `/images/og/${id}.jpg`
