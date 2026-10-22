const keywords = [
 ['sneaker',['sneaker','shoe','trainer','footwear','running shoes']],
 ['watch',['watch','timepiece','wristwatch']],
 ['chair',['chair','sofa','furniture','seat']],
 ['rings',['ring','earring','necklace','jewel','bracelet','diamond']],
 ['lamp',['lamp','lighting','light','chandelier','sconce']],
 ['bottle',['perfume','serum','shampoo','fragrance','cream','bottle','skincare']],
 ['eyewear',['eyewear','sunglasses','glasses','spectacles','optical frames']],
 ['speaker',['speaker','soundbar','hi fi','hifi','subwoofer','audio system']],
 ['controller',['controller','gamepad','joystick','console controller']],
 ['gear',['backpack','camping bag','rucksack','trekking pack','hiking bag']],
 ['cup',['coffee','espresso','tea cup','mug','latte']],
 ['ball',['football','basketball','soccer ball','volleyball','sports ball']],
 ['device',['phone','tablet','headphone','laptop','camera']],
 ['vehicle',['car','bike','automotive','motorcycle','suv']],
 ['fabric',['dress','jacket','saree','shirt','kurta','hoodie','clothing','fabric','apparel']],
 ['architecture',['building','architecture','house','interior']],
 ['planet',['galaxy','planet','space','universe']],
];
export function inferConcept(name,fallback='sculpture'){
 const q=` ${String(name||'').toLowerCase().replace(/[^a-z0-9]+/g,' ')} `;
 for(const [kind,patterns] of keywords)if(patterns.some(k=>q.includes(` ${k} `)))return kind;
 return fallback;
}
