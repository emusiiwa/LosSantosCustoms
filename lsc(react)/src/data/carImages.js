import cClassAmgCoupe from '../assets/images/cars/c-class-amg-coupe.png'
import cClass from '../assets/images/cars/cclass.jpg'
import gWagon from '../assets/images/cars/g-wagon.jpeg'
import gClass from '../assets/images/cars/gclass.jpg'
import sClass from '../assets/images/cars/sclass.jpg'

const CAR_IMAGES = {
  'c-class-amg-coupe.png': cClassAmgCoupe,
  'cclass.jpg': cClass,
  'g-wagon.jpeg': gWagon,
  'gclass.jpg': gClass,
  'sclass.jpg': sClass,
}

// seed cars reference a filename, user-added cars store an uploaded data URL directly
export function resolveCarImage(filename) {
  if (filename?.startsWith('data:')) return filename
  return CAR_IMAGES[filename] ?? cClass
}
