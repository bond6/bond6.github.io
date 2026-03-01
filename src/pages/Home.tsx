import React, { useState, useEffect } from 'react';
import { isPlatform, getPlatforms } from '@ionic/react';

import { IonFooter,IonInput,IonListHeader, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonRadio, IonCheckbox, IonList, IonItem, IonLabel,IonButton, IonRadioGroup, IonAlert  } from '@ionic/react';
import * as serviceWorker from '../serviceWorker';
import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';

import './Home.css';

// Check if running as native app (not just in browser)
var isNative = getPlatforms().includes('capacitor');
const sub_country = {"Codex A": ["Angola", "Benin", "Botswana", "Congo", "Gabon", "Kenya", "Madagascar", "Mali", "Mauritius", "Mauritania", "Namibia", "Senegal", "Seychelles", "Reunion", "Sudan", "Tanzania", "Malaysia", "Philippines", "Singapore", "Vietnam"]};


const your_collection = [{"country": "Canada", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Canada", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Canada", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Canada", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Canada", "fruit": "Grapefruit", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Canada", "fruit": "Lemons", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Canada", "fruit": "Mandarin types", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Canada", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Canada", "fruit": "Grapefruit", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Canada", "fruit": "Lemons", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Canada", "fruit": "Mandarin types", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Canada", "fruit": "Oranges", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Canada", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Canada", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Canada", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Canada", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Canada", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Canada", "fruit": "Lemons", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Canada", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Canada", "fruit": "Oranges", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Canada", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Canada", "fruit": "Lemons", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Canada", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Canada", "fruit": "Oranges", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Canada", "fruit": "Grapefruit", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Canada", "fruit": "Lemons", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Canada", "fruit": "Mandarin types", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Canada", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Canada", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Canada", "fruit": "Lemons", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Canada", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Canada", "fruit": "Oranges", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Canada", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Canada", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Canada", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Canada", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Canada", "fruit": "Grapefruit", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Canada", "fruit": "Lemons", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Canada", "fruit": "Mandarin types", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Canada", "fruit": "Oranges", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "China", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "N", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "China", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "N", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "China", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "1", "product": ["StrobiCure", "Evolve 480 SC", "Report Name:National Food Safety Standard Maximum Residue Limits for \nPesticides in Foods November 18, 2019"]}, {"country": "China", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "1", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "China", "fruit": "Grapefruit", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "China", "fruit": "Lemons", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "China", "fruit": "Mandarin types", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "China", "fruit": "Oranges", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "China", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "China", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "China", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "China", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "China", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "China", "fruit": "Lemons", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "China", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "China", "fruit": "Oranges", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "China", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "China", "fruit": "Lemons", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "China", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "China", "fruit": "Oranges", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "China", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "China", "fruit": "Lemons", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "China", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "5", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "China", "fruit": "Oranges", "active": "Prochloraz", "mrl": "5", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "China", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "China", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "China", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "China", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "China", "fruit": "Grapefruit", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC", "Pummelo 10"]}, {"country": "China", "fruit": "Lemons", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "China", "fruit": "Mandarin types", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "China", "fruit": "Oranges", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Codex A", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC", "Always confirm MRL with exporter, as citrus commodities are not always cleary defined"]}, {"country": "Codex A", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Codex A", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Codex A", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Codex A", "fruit": "Grapefruit", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Codex A", "fruit": "Lemons", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Codex A", "fruit": "Mandarin types", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Codex A", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Codex A", "fruit": "Grapefruit", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Codex A", "fruit": "Lemons", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Codex A", "fruit": "Mandarin types", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Codex A", "fruit": "Oranges", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Codex A", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Codex A", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Codex A", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Codex A", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Codex A", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Codex A", "fruit": "Lemons", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Codex A", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Codex A", "fruit": "Oranges", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Codex A", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "15", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Codex A", "fruit": "Lemons", "active": "Imazalil", "mrl": "15", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Codex A", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "15", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Codex A", "fruit": "Oranges", "active": "Imazalil", "mrl": "15", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Codex A", "fruit": "Grapefruit", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Codex A", "fruit": "Lemons", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Codex A", "fruit": "Mandarin types", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Codex A", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Codex A", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Codex A", "fruit": "Lemons", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Codex A", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Codex A", "fruit": "Oranges", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Codex A", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Codex A", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Codex A", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Codex A", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Codex A", "fruit": "Grapefruit", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Codex A", "fruit": "Lemons", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Codex A", "fruit": "Mandarin types", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Codex A", "fruit": "Oranges", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "EU", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "EU", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "EU", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "EU", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "EU", "fruit": "Grapefruit", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "EU", "fruit": "Lemons", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "EU", "fruit": "Mandarin types", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "EU", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "EU", "fruit": "Grapefruit", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "EU", "fruit": "Lemons", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "EU", "fruit": "Mandarin types", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "EU", "fruit": "Oranges", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "EU", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "EU", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "EU", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "EU", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "EU", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "EU", "fruit": "Lemons", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "EU", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "EU", "fruit": "Oranges", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "EU", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "4", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "EU", "fruit": "Lemons", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "EU", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "EU", "fruit": "Oranges", "active": "Imazalil", "mrl": "4", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "EU", "fruit": "Grapefruit", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "EU", "fruit": "Lemons", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "EU", "fruit": "Mandarin types", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "EU", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "EU", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "EU", "fruit": "Lemons", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "EU", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "EU", "fruit": "Oranges", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "EU", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "8", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "EU", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "8", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "EU", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "8", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "EU", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "8", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "EU", "fruit": "Grapefruit", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "EU", "fruit": "Lemons", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "EU", "fruit": "Mandarin types", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "EU", "fruit": "Oranges", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Great Britain", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Great Britain", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Great Britain", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Great Britain", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Great Britain", "fruit": "Grapefruit", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Great Britain", "fruit": "Lemons", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Great Britain", "fruit": "Mandarin types", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Great Britain", "fruit": "Oranges", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Great Britain", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Great Britain", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Great Britain", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Great Britain", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Great Britain", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Great Britain", "fruit": "Lemons", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Great Britain", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Great Britain", "fruit": "Oranges", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Great Britain", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "4", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC"]}, {"country": "Great Britain", "fruit": "Lemons", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Great Britain", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC"]}, {"country": "Great Britain", "fruit": "Oranges", "active": "Imazalil", "mrl": "4", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC"]}, {"country": "Great Britain", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Great Britain", "fruit": "Lemons", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Great Britain", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Great Britain", "fruit": "Oranges", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Great Britain", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "8", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Great Britain", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "8", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Great Britain", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "8", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Great Britain", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "8", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Great Britain", "fruit": "Grapefruit", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Great Britain", "fruit": "Lemons", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Great Britain", "fruit": "Mandarin types", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Great Britain", "fruit": "Oranges", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Hong Kong", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Hong Kong", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Hong Kong", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Hong Kong", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Hong Kong", "fruit": "Grapefruit", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Hong Kong", "fruit": "Lemons", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Hong Kong", "fruit": "Mandarin types", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Hong Kong", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Hong Kong", "fruit": "Grapefruit", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Hong Kong", "fruit": "Lemons", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Hong Kong", "fruit": "Mandarin types", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Hong Kong", "fruit": "Oranges", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Hong Kong", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Hong Kong", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Hong Kong", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Hong Kong", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Hong Kong", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Hong Kong", "fruit": "Lemons", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Hong Kong", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Hong Kong", "fruit": "Oranges", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Hong Kong", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "10", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Hong Kong", "fruit": "Lemons", "active": "Imazalil", "mrl": "10", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Hong Kong", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "10", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Hong Kong", "fruit": "Oranges", "active": "Imazalil", "mrl": "10", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Hong Kong", "fruit": "Grapefruit", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Hong Kong", "fruit": "Lemons", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Hong Kong", "fruit": "Mandarin types", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Hong Kong", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Hong Kong", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Hong Kong", "fruit": "Lemons", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Hong Kong", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Hong Kong", "fruit": "Oranges", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Hong Kong", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Hong Kong", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Hong Kong", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Hong Kong", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Hong Kong", "fruit": "Grapefruit", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Hong Kong", "fruit": "Lemons", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Hong Kong", "fruit": "Mandarin types", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Hong Kong", "fruit": "Oranges", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Indonesia", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Indonesia", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Indonesia", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Indonesia", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Indonesia", "fruit": "Grapefruit", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Indonesia", "fruit": "Lemons", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Indonesia", "fruit": "Mandarin types", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Indonesia", "fruit": "Grapefruit", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Indonesia", "fruit": "Lemons", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Indonesia", "fruit": "Mandarin types", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Indonesia", "fruit": "Oranges", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Indonesia", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Indonesia", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Indonesia", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Indonesia", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Indonesia", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Indonesia", "fruit": "Lemons", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Indonesia", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Indonesia", "fruit": "Oranges", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Indonesia", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Indonesia", "fruit": "Lemons", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Indonesia", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Indonesia", "fruit": "Oranges", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Indonesia", "fruit": "Grapefruit", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Indonesia", "fruit": "Lemons", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Indonesia", "fruit": "Mandarin types", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Indonesia", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Indonesia", "fruit": "Lemons", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Indonesia", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Indonesia", "fruit": "Oranges", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Indonesia", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Indonesia", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Indonesia", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Indonesia", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Indonesia", "fruit": "Grapefruit", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Indonesia", "fruit": "Lemons", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Indonesia", "fruit": "Mandarin types", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Indonesia", "fruit": "Oranges", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Japan", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Japan", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Japan", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "0", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Japan", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Japan", "fruit": "Grapefruit", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Japan", "fruit": "Lemons", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Japan", "fruit": "Mandarin types", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Japan", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Japan", "fruit": "Grapefruit", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Japan", "fruit": "Lemons", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Japan", "fruit": "Mandarin types", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Japan", "fruit": "Oranges", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Japan", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Japan", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Japan", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Japan", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Japan", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Japan", "fruit": "Lemons", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Japan", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Japan", "fruit": "Oranges", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Japan", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Japan", "fruit": "Lemons", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Japan", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Japan", "fruit": "Oranges", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Japan", "fruit": "Grapefruit", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Japan", "fruit": "Lemons", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Japan", "fruit": "Mandarin types", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Japan", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Japan", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Japan", "fruit": "Lemons", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Japan", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Japan", "fruit": "Oranges", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Japan", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Japan", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Japan", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Japan", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Japan", "fruit": "Grapefruit", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Japan", "fruit": "Lemons", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Japan", "fruit": "Mandarin types", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Japan", "fruit": "Oranges", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Korea", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Korea", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Korea", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "9", "product": ["StrobiCure", "Evolve 480 SC", "BC"]}, {"country": "Korea", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Korea", "fruit": "Grapefruit", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Korea", "fruit": "Lemons", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Korea", "fruit": "Mandarin types", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Korea", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Korea", "fruit": "Grapefruit", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Korea", "fruit": "Lemons", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Korea", "fruit": "Mandarin types", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Korea", "fruit": "Oranges", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Korea", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Korea", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Korea", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Korea", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Korea", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Korea", "fruit": "Lemons", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Korea", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "0.5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Korea", "fruit": "Oranges", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Korea", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "15", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Korea", "fruit": "Lemons", "active": "Imazalil", "mrl": "15", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Korea", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "15", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Korea", "fruit": "Oranges", "active": "Imazalil", "mrl": "15", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Korea", "fruit": "Grapefruit", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Korea", "fruit": "Lemons", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Korea", "fruit": "Mandarin types", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Korea", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Korea", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Korea", "fruit": "Lemons", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Korea", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC", "AgriIntel"]}, {"country": "Korea", "fruit": "Oranges", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Korea", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Korea", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Korea", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "1", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Korea", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Korea", "fruit": "Grapefruit", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Korea", "fruit": "Lemons", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Korea", "fruit": "Mandarin types", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Korea", "fruit": "Oranges", "active": "TBZ", "mrl": "7", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "RSA", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "RSA", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "RSA", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "RSA", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "RSA", "fruit": "Grapefruit", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "RSA", "fruit": "Lemons", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "RSA", "fruit": "Mandarin types", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "RSA", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "RSA", "fruit": "Grapefruit", "active": "DDAC", "mrl": "6", "product": ["Sporekill"]}, {"country": "RSA", "fruit": "Lemons", "active": "DDAC", "mrl": "6", "product": ["Sporekill"]}, {"country": "RSA", "fruit": "Mandarin types", "active": "DDAC", "mrl": "6", "product": ["Sporekill"]}, {"country": "RSA", "fruit": "Oranges", "active": "DDAC", "mrl": "6", "product": ["Sporekill"]}, {"country": "RSA", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "RSA", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "RSA", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "RSA", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "RSA", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "RSA", "fruit": "Lemons", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "RSA", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "RSA", "fruit": "Oranges", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "RSA", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "RSA", "fruit": "Lemons", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "RSA", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "RSA", "fruit": "Oranges", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "RSA", "fruit": "Grapefruit", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "RSA", "fruit": "Lemons", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "RSA", "fruit": "Mandarin types", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "RSA", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "RSA", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "2", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "RSA", "fruit": "Lemons", "active": "Prochloraz", "mrl": "2", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "RSA", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "2", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "RSA", "fruit": "Oranges", "active": "Prochloraz", "mrl": "2", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "RSA", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "RSA", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "RSA", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "RSA", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "RSA", "fruit": "Grapefruit", "active": "TBZ", "mrl": "6", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "RSA", "fruit": "Lemons", "active": "TBZ", "mrl": "6", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "RSA", "fruit": "Mandarin types", "active": "TBZ", "mrl": "6", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "RSA", "fruit": "Oranges", "active": "TBZ", "mrl": "6", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Russia", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC", "BC"]}, {"country": "Russia", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC", "BC"]}, {"country": "Russia", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC", "BC"]}, {"country": "Russia", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC", "BC"]}, {"country": "Russia", "fruit": "Grapefruit", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Russia", "fruit": "Lemons", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Russia", "fruit": "Mandarin types", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Russia", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Russia", "fruit": "Grapefruit", "active": "DDAC", "mrl": "6", "product": ["Sporekill"]}, {"country": "Russia", "fruit": "Lemons", "active": "DDAC", "mrl": "6", "product": ["Sporekill"]}, {"country": "Russia", "fruit": "Mandarin types", "active": "DDAC", "mrl": "6", "product": ["Sporekill"]}, {"country": "Russia", "fruit": "Oranges", "active": "DDAC", "mrl": "6", "product": ["Sporekill"]}, {"country": "Russia", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "7", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Russia", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "7", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Russia", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "7", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Russia", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "7", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Russia", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Russia", "fruit": "Lemons", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Russia", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Russia", "fruit": "Oranges", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Russia", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Russia", "fruit": "Lemons", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Russia", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Russia", "fruit": "Oranges", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Russia", "fruit": "Grapefruit", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Russia", "fruit": "Lemons", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Russia", "fruit": "Mandarin types", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Russia", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Russia", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Russia", "fruit": "Lemons", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Russia", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Russia", "fruit": "Oranges", "active": "Prochloraz", "mrl": "10", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Russia", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Russia", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Russia", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Russia", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Russia", "fruit": "Grapefruit", "active": "TBZ", "mrl": "5", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Russia", "fruit": "Lemons", "active": "TBZ", "mrl": "5", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Russia", "fruit": "Mandarin types", "active": "TBZ", "mrl": "5", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Russia", "fruit": "Oranges", "active": "TBZ", "mrl": "5", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Taiwan", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Taiwan", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Taiwan", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Taiwan", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "10", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "Taiwan", "fruit": "Grapefruit", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Taiwan", "fruit": "Lemons", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Taiwan", "fruit": "Mandarin types", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Taiwan", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "Taiwan", "fruit": "Grapefruit", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Taiwan", "fruit": "Lemons", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Taiwan", "fruit": "Mandarin types", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Taiwan", "fruit": "Oranges", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "Taiwan", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "7", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Taiwan", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "7", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Taiwan", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "5", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Taiwan", "fruit": "Pumello", "active": "Fludioxonil", "mrl": "7", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "Taiwan", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Taiwan", "fruit": "Lemons", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Taiwan", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Taiwan", "fruit": "Oranges", "active": "Guazatine", "mrl": "5", "product": ["CitriCure", "Guazalil SL"]}, {"country": "Taiwan", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Taiwan", "fruit": "Lemons", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Taiwan", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Taiwan", "fruit": "Oranges", "active": "Imazalil", "mrl": "5", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "Taiwan", "fruit": "Grapefruit", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Taiwan", "fruit": "Lemons", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Taiwan", "fruit": "Mandarin types", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Taiwan", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "Taiwan", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Taiwan", "fruit": "Lemons", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Taiwan", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Taiwan", "fruit": "Oranges", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "Taiwan", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Taiwan", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Taiwan", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Taiwan", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "7", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "Taiwan", "fruit": "Grapefruit", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Taiwan", "fruit": "Lemons", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Taiwan", "fruit": "Mandarin types", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "Taiwan", "fruit": "Oranges", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "USA", "fruit": "Grapefruit", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "USA", "fruit": "Lemons", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "USA", "fruit": "Mandarin types", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "USA", "fruit": "Oranges", "active": "Azoxystrobin", "mrl": "15", "product": ["StrobiCure", "Evolve 480 SC"]}, {"country": "USA", "fruit": "Grapefruit", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "USA", "fruit": "Lemons", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "USA", "fruit": "Mandarin types", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "USA", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "USA", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "USA", "fruit": "Oranges", "active": "Clove Oil", "mrl": "\u221e", "product": ["Ecotizer"]}, {"country": "USA", "fruit": "Grapefruit", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "USA", "fruit": "Lemons", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "USA", "fruit": "Mandarin types", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "USA", "fruit": "Oranges", "active": "DDAC", "mrl": "N", "product": ["Sporekill"]}, {"country": "USA", "fruit": "Grapefruit", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "USA", "fruit": "Lemons", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "USA", "fruit": "Mandarin types", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "USA", "fruit": "Oranges", "active": "Fludioxonil", "mrl": "10", "product": ["Teacher 230 SC", "Evolve 480 SC", "Tutor 500 SC"]}, {"country": "USA", "fruit": "Grapefruit", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "USA", "fruit": "Lemons", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "USA", "fruit": "Mandarin types", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "USA", "fruit": "Oranges", "active": "Guazatine", "mrl": "N", "product": ["CitriCure", "Guazalil SL"]}, {"country": "USA", "fruit": "Grapefruit", "active": "Imazalil", "mrl": "10", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "USA", "fruit": "Lemons", "active": "Imazalil", "mrl": "10", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "USA", "fruit": "Mandarin types", "active": "Imazalil", "mrl": "10", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "USA", "fruit": "Oranges", "active": "Imazalil", "mrl": "10", "product": ["Guazalil SL", "ImazaCure 500 EC", "ImaCulate 300 EC", "ImazaCure 750 SG"]}, {"country": "USA", "fruit": "Grapefruit", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "USA", "fruit": "Lemons", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "USA", "fruit": "Mandarin types", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "USA", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "USA", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "USA", "fruit": "Oranges", "active": "Peracetic Acid Peroxide", "mrl": "\u221e", "product": ["HyperCide"]}, {"country": "USA", "fruit": "Grapefruit", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "USA", "fruit": "Lemons", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "USA", "fruit": "Mandarin types", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "USA", "fruit": "Oranges", "active": "Prochloraz", "mrl": "N", "product": ["ICA-Prochloraz 450 EC"]}, {"country": "USA", "fruit": "Grapefruit", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "USA", "fruit": "Lemons", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "USA", "fruit": "Mandarin types", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "USA", "fruit": "Oranges", "active": "Pyrimethanil", "mrl": "10", "product": ["Protector 400 SC", "Tutor 500 SC"]}, {"country": "USA", "fruit": "Grapefruit", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "USA", "fruit": "Lemons", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "USA", "fruit": "Mandarin types", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}, {"country": "USA", "fruit": "Oranges", "active": "TBZ", "mrl": "10", "product": ["ICA Thiabendazole 500 SC"]}];
var fruit_arr:{fruit: string; isCheck:boolean}[] = [];
var fruit_country_s = true;
function fruit_funct(){
  var lookup:{[key: string]: any} = [];
     var items = your_collection;
     var result = [];
     var item = items[0];
     for (var i = 1; i < items.length; i++) {

        var name = item.fruit;

         if (!(name in lookup)) {
             lookup[name] = 1;
             if (name === "Grapefruit") {
                result.push({"fruit" : name, "isCheck":false});
             } else {
                result.push({"fruit" : name, "isCheck":false});
             }
         }
         item = items[i];
     }
     fruit_arr = result;

};
fruit_funct();

// Build a lookup: fruit -> set of countries that have data for it
var fruit_country_map:{[key: string]: Set<string>} = {};
your_collection.forEach(function(item) {
  if (!fruit_country_map[item.fruit]) {
    fruit_country_map[item.fruit] = new Set();
  }
  fruit_country_map[item.fruit].add(item.country);
});

// Map ISO country codes to app country names
var isoToAppCountry:{[key: string]: string} = {
  "ZA": "RSA", "CA": "Canada", "CN": "China", "HK": "Hong Kong",
  "ID": "Indonesia", "JP": "Japan", "KR": "Korea", "RU": "Russia",
  "TW": "Taiwan", "US": "USA", "GB": "Great Britain",
  // EU member states
  "AT": "EU", "BE": "EU", "BG": "EU", "HR": "EU", "CY": "EU",
  "CZ": "EU", "DK": "EU", "EE": "EU", "FI": "EU", "FR": "EU",
  "DE": "EU", "GR": "EU", "HU": "EU", "IE": "EU", "IT": "EU",
  "LV": "EU", "LT": "EU", "LU": "EU", "MT": "EU", "NL": "EU",
  "PL": "EU", "PT": "EU", "RO": "EU", "SK": "EU", "SI": "EU",
  "ES": "EU", "SE": "EU",
  // Codex A sub-countries
  "AO": "Codex A", "BJ": "Codex A", "BW": "Codex A", "CG": "Codex A",
  "GA": "Codex A", "KE": "Codex A", "MG": "Codex A", "ML": "Codex A",
  "MU": "Codex A", "MR": "Codex A", "NA": "Codex A", "SN": "Codex A",
  "SC": "Codex A", "RE": "Codex A", "SD": "Codex A", "TZ": "Codex A",
  "MY": "Codex A", "PH": "Codex A", "SG": "Codex A", "VN": "Codex A"
};

// Detect user's country via IP geolocation
var detectedCountry: string = "";
fetch("https://ipapi.co/country/")
  .then(function(response) { return response.text(); })
  .then(function(code) {
    var mapped = isoToAppCountry[code.trim()];
    if (mapped) {
      detectedCountry = mapped;
    }
  })
  .catch(function() { /* silently fail — RSA remains default */ });

var country_arr:{country: string; sub:string; isCheck:boolean}[] = [];

function country_funct() {
  var lookup:{[key: string]: any} = [];
     var country_s: { [key: string]: any } = sub_country;
     var items = your_collection;
     var result:any[] = [];
     var item = items[0];
     for (var i = 1; i < items.length; i++) {
        var name = item.country;

         if (!(name in lookup)) {
             lookup[name] = 1;
             if (name === "RSA") {
               result.push({"country" : name, "sub" : name, "isCheck":true});
             } else {
                result.push({"country" : name, "sub" : name, "isCheck":false});
             }
         }
         item = items[i];
     }

     Object.keys(country_s).forEach(function(key) {
          for (var i = 0; i < country_s[key].length; i++) {
             result.push({"country" : country_s[key][i], "sub" : key, "isCheck":false});
          }
     });
     result.sort(function(a, b)
 {
  var x = a["country"]; var y = b["country"];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 });
     country_arr = result ;

};
function myFunction(product:string[]){
    var str_v:string = "";
    for (var i = 0; i < product.length; i++) {
        str_v += product[i] + "<br>";
    }

    return str_v;

  }
country_funct();

var filterInProgress = false;

function filterCountriesByFruit(fruitName: string) {
  var validCountries = fruit_country_map[fruitName];
  if (!validCountries) return;
  filterInProgress = true;

  // Build set of valid sub-country parents (e.g., "Codex A")
  var validSubs = new Set<string>();
  validCountries.forEach(function(c) { validSubs.add(c); });

  // RSA is always the export country — auto-select if valid for this fruit
  var rsaValid = validCountries.has("RSA");

  // Build list of countries to auto-select
  var autoSelect = new Set<string>();
  if (rsaValid) {
    autoSelect.add("RSA");
  }
  // Auto-select the user's detected country if valid for this fruit
  if (detectedCountry && detectedCountry !== "RSA") {
    if (validCountries.has(detectedCountry)) {
      autoSelect.add(detectedCountry);
    }
    // Also check if detected country maps to a sub-country parent
    var detectedEntry = country_arr.find(function(c) { return c.country === detectedCountry; });
    if (detectedEntry && validSubs.has(detectedEntry.sub)) {
      autoSelect.add(detectedCountry);
    }
  }
  // If nothing to auto-select and only one country exists, select it
  if (autoSelect.size === 0 && validCountries.size === 1) {
    validCountries.forEach(function(c) { autoSelect.add(c); });
  }

  // Clear the "Countries Selected" display
  var countrySelElem = document.getElementsByClassName("country_sel")[0];
  if (countrySelElem) {
    countrySelElem.innerHTML = '';
  }

  var items = document.querySelectorAll('.scroll ion-item');
  items.forEach(function(item) {
    var el = item as HTMLElement;
    var countryName = el.id;
    var countryEntry = country_arr.find(function(c) { return c.country === countryName; });
    if (countryEntry) {
      var isValid = validCountries.has(countryName) || validSubs.has(countryEntry.sub);
      el.style.display = isValid ? '' : 'none';

      var checkbox = el.querySelector('ion-checkbox') as any;
      if (!checkbox) return;

      if (!isValid) {
        checkbox.checked = false;
      } else if (autoSelect.has(countryName)) {
        // Auto-select this country
        checkbox.checked = true;
        if (countrySelElem) {
          var lbl = document.createElement("IonLabel");
          lbl.innerHTML = "<div>" + countryName + "</div>";
          lbl.id = countryName;
          countrySelElem.appendChild(lbl);
        }
      } else {
        // Uncheck everything else on fruit change
        checkbox.checked = false;
      }
    }
  });
  filterInProgress = false;
}

const Home: React.FC = () => {
  const [showAlert0, setShowAlert0] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);

  // Restore last fruit/country selection on app launch
  useEffect(() => {
    async function restoreSelection() {
      try {
        var savedFruit = await Preferences.get({ key: 'lastFruit' });
        if (savedFruit.value) {
          // Wait for DOM to be ready
          setTimeout(function() {
            // Select the saved fruit radio
            var radios = document.getElementsByClassName("fruit");
            for (var i = 0; i < radios.length; i++) {
              if (radios[i].getAttribute("value") === savedFruit.value) {
                (radios[i] as any).click();
                break;
              }
            }
          }, 500);
        }
      } catch(e) { /* ignore if Preferences not available */ }
    }
    restoreSelection();
  }, []);

  const check_fun = async () => {
     var fruit_s:string = "";
     var country_s1:string[] = [];
     var final_result:any[] = [];
     var x = document.getElementsByClassName("country");
      var y = document.getElementsByClassName("fruit");
     for (var i = 0; i < x.length; i++) {
        if (x[i].getAttribute("aria-checked") === "true") {
            var str_c:string = (x[i].getAttribute("value") || "");
            country_s1.push(str_c);
        }
     }

     for (var i2 = 0; i2 < y.length; i2++) {
        if (y[i2].getAttribute("aria-checked") === "true") {
            var str_f:string = (y[i2].getAttribute("value") || "");
            fruit_s = str_f;
        }
     }
     if (fruit_s !== "" && country_s1.length !== 0) {

    // Save last selection for next app launch
    Preferences.set({ key: 'lastFruit', value: fruit_s });
    Preferences.set({ key: 'lastCountries', value: JSON.stringify(country_s1) });

    var result = your_collection.filter(function(i) {
       for (var j = 0; j < country_s1.length; j++ ) {
          if ( i.fruit === fruit_s && i.country === country_s1[j])
          {
             return true;
          }
       }
       return false;
       });
    var sorted = result.sort(function IHaveAName(a, b) {
    return b.active < a.active ?  1
         : b.active > a.active ? -1
         : 0;
    });
    sorted.forEach(function(it){
    	var index = final_result.findIndex(function(item, i){
  		return item.active === it.active;
	});

	if (index === -1) {
	   final_result.push(it);
	} else {
    //console.log(it.country + " : " + parseInt(it.mrl) + " " + final_result[index].country + " : "+ parseInt(final_result[index].mrl));
    //console.log(parseInt(it.mrl) < parseInt(final_result[index].mrl));
	   if (final_result[index].mrl ==='N') {
	   } else if (it.mrl === 'N') {
	      final_result[index] = it;
	   } else if (parseInt(it.mrl) < parseInt(final_result[index].mrl)) {
	      final_result[index] = it;
	   } else {
	      //final_result[index].mrl = it.mrl;
	   }
	}
    });
    //console.log(final_result);
    var html_str:string = "<ion-grid> <ion-row class='row'><ion-col size='4' class='col'>Active </ion-col><ion-col size='4' class='col'>MRL</ion-col><ion-col class='col' size='4'>Product</ion-col></ion-row>";
    for (var i3 = 0; i3 < final_result.length; i3++) {
       if (final_result[i3].mrl !== "N") {
            if (final_result[i3].mrl === "∞") {
                html_str += "<ion-row class='row'> <ion-col size='4' class='col'> " + final_result[i3].active + " </ion-col> <ion-col size='4' class='col'> <p class='blue0'> " + final_result[i3].mrl + "</p> </ion-col> <ion-col size='4' class='col'> " + myFunction(final_result[i3].product) + " </ion-col> </ion-row>";
            } else if (final_result[i3].mrl === "#") {
              html_str += "<ion-row class='row'> <ion-col size='4' class='col'> " + final_result[i3].active + " </ion-col> <ion-col size='4' class='col'> <p class='blue'> " + final_result[i3].mrl + "</p> </ion-col> <ion-col size='4' class='col'> " + myFunction(final_result[i3].product) + " </ion-col> </ion-row>";
            } else {
              html_str += "<ion-row class='row'> <ion-col size='4' class='col'> " + final_result[i3].active + " </ion-col> <ion-col size='4' class='col'>  " + final_result[i3].mrl + " </ion-col> <ion-col size='4' class='col'> " + myFunction(final_result[i3].product) + " </ion-col> </ion-row>";
            }
       }

    }
    html_str += "</ion-grid>";
    document.getElementsByClassName("demo")[0].innerHTML = html_str;
    //return final_result;
    fruit_country_s = true;
  } else {
    if (fruit_s === "" && country_s1.length === 0) {
        setShowAlert2(true)
    } else if (fruit_s === "") {
        setShowAlert1(true)
    } else {
        setShowAlert3(true)
    }
    fruit_country_s = false;
  }

  };
  function go_bottom () {
      if (fruit_country_s) {
      setTimeout(function(){
document.getElementsByClassName("country_sel")[0].scrollIntoView();
}, 200);
}
}
    function handleInput(event: CustomEvent) {
      var items = Array.from(document.querySelector('.scroll')!.children);
      var first_i = 0;
      const query = event.detail.value.toLowerCase();
        items.forEach(item => {
          const shouldShow = item.id.toLowerCase().indexOf(query);
          if (shouldShow === 0 && first_i === 0) {
            first_i = 1;
            var myElement = document.getElementById(item.id)!;
            var topPos = myElement.offsetTop;
            document.getElementById('scrolling_div')!.scrollTop = topPos;

          }
        });

    }
    function event_handle(event: CustomEvent) {
        if (filterInProgress) return;
        var elem_show = document.getElementsByClassName("country_sel")[0];
        var items = Array.from(elem_show.children);
        var elem_click = event.target! as HTMLInputElement;
        var value_v2 = elem_click.id;
        var bool = false;
        items.forEach(item => {
             if (item.id === value_v2) {
                 bool = true;
                 elem_show.removeChild(item);
             }
        });
        if (bool === false) {
            var lbl = document.createElement("IonLabel");
            lbl.innerHTML = "<div>" + value_v2 + "</div>";
            lbl.id = value_v2;
            elem_show.appendChild(lbl);
        }
    }
  const [selected] = useState<string>('biff');


  return (
    <IonPage>
      <IonHeader color="primary"  collapse="condense">
        <IonToolbar color="primary">
          <IonTitle>Citrus MRL V6.0</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Citrus MRL V6.0</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonAlert
          isOpen={showAlert0}
          onDidDismiss={() => setShowAlert0(false)}
          cssClass='my-custom-class'
          header={"How to Download ios app"}
          subHeader={'Add app to Homescreen iOS'}
          message={'tap <img className="share_safari" alt="share" src="/assets/img/safari.png" /> <br> and then tap <img className="homescreen_safari" alt="share" src="/assets/img/homescreen.png" />'}
          buttons={['OK']}
        />
      <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          cssClass='my-custom-class'
          header={'Fruit'}
          subHeader={'Fruit'}
          message={'Select a fruit'}
          buttons={['OK']}
        />
        <IonAlert
          isOpen={showAlert2}
          onDidDismiss={() => setShowAlert2(false)}
          cssClass='my-custom-class'
          header={'Fruit and country'}
          subHeader={'Fruit and country'}
          message={'Select a fruit and country'}
          buttons={['OK']}
        />
        <IonAlert
          isOpen={showAlert3}
          onDidDismiss={() => setShowAlert3(false)}
          cssClass='my-custom-class'
          header={'Country'}
          subHeader={'Country'}
          message={'Select a country'}
          buttons={['OK']}
        />

        <IonItem>
        <img className="logo_img" alt="ICA Logo" src="/assets/img/logo1.png" />
        </IonItem>
        <IonItem>
        <div className="IonCenterAlign">


                    <img className="mag_img" alt="Facebook" src="/assets/img/facebook.png"  onClick={function() {window.open("https://www.facebook.com/ICAInternationalChemicals/?rf=1585922241735402",'_system', 'location=yes');}}/>

                    <img className="mag_img3" alt="Website" src="/assets/img/website_logo.png" onClick={function() {window.open("http://icaonline.co.za",'_system', 'location=yes');}}/>


                    <img className="mag_img3" alt="Update" src="/assets/img/update_logo.png" onClick={function() {serviceWorker.unregister(); window.location.href = window.location.origin; window.location.reload();}} />

        <img className="mag_img2" alt="Magazine" src="/assets/img/bros.png" onClick={function() {window.open("https://visualprojects.co.za/Info-Hub/ICA/",'_system', 'location=yes');}} />

        <img className="mag_img1" alt="Magazine" src="/assets/img/bros1.png" onClick={function() {window.open("https://testicamobilemagazine.web.app/products_bros.html",'_system', 'location=yes');}} />
        </div>
        </IonItem>

        <IonItem>
              <div className="button_click1">
                  <IonButton  href="#/dosage"><IonLabel>Dosages (RSA)</IonLabel></IonButton>
                  <IonButton  href="#/label"><IonLabel>Products</IonLabel></IonButton>
              </div>
        </IonItem>
        {isPlatform('ios') &&
        <IonItem>
        <div className="button_click1">
        <IonButton onClick={() => setShowAlert0(true)}><IonLabel>How to Download iOS app</IonLabel></IonButton>
        </div>
        </IonItem>

      }
        <IonList>
          <IonListHeader><IonLabel><h1>Fruit</h1></IonLabel></IonListHeader>
<IonRadioGroup value={selected} onIonChange={(e: any) => { filterCountriesByFruit(e.detail.value); }}>

           {fruit_arr.map(({ fruit, isCheck }, i) => (
            <IonItem key={i}>
              <IonLabel>{fruit}</IonLabel>
              <IonRadio slot="end" class="fruit" value={fruit}/>
            </IonItem>
          ))}

          </IonRadioGroup>

        </IonList>

          <IonListHeader><IonLabel><h1>Country</h1></IonLabel></IonListHeader>
          <IonItem>
          <IonInput placeholder="Enter Country Name"  id='input_country' onIonChange={e => handleInput(e)}></IonInput>
          </IonItem>
          <div className="scroll1" id="scrolling_div">
              <IonList className="scroll">
               {country_arr.map(({ country, sub, isCheck }, i) => (
                <IonItem key={i} id={country} class={country}>
                  {country}
                  <IonCheckbox onIonChange={function (e) {event_handle(e);}} slot="end" class="country" id={country} value={sub} name={country} checked={isCheck} />
                </IonItem>
              ))}
              </IonList>
          </div>


          <IonListHeader><IonLabel><h1>Countries Selected</h1></IonLabel></IonListHeader>
          <IonList class="country_sel"> <IonLabel id="RSA"> <div>RSA</div> </IonLabel> </IonList>
          <div className="margin1"><IonLabel className="red"> Residues must comply to import as well as export countries (RSA) MRL's. </IonLabel></div>
          <div className="margin1"><IonLabel className="blue"> ∞ No residue </IonLabel></div>
          <div className="margin1"><IonLabel className="blue"> # Exempt from MRL - EU </IonLabel></div>
          <div className="margin1"><IonLabel className="red"> No guarantees are given that the MRL data is correct at time of use. It is the user's responsibility to be familiar with the latest MRL requirements of their markets.  </IonLabel></div>
          <IonListHeader><IonLabel><h1>MRL Table</h1></IonLabel></IonListHeader>
          <IonItem class="demo">
          </IonItem>
      </IonContent>
      <IonFooter color="primary">
        <IonToolbar className="button_click1" color="primary">

          <IonButton  color="light" className="button_click1 margin1" onClick={async function() {
            if (isNative) { try { await Haptics.impact({style: ImpactStyle.Medium}); } catch(e){} }
            check_fun(); go_bottom();
          }}>
            submit
          </IonButton>

          {isPlatform('ios') &&
          <IonButton  color="light" className="button_click1 margin1" onClick={async function() {
            var demoEl = document.getElementsByClassName("demo")[0];
            if (!demoEl || !demoEl.textContent || demoEl.textContent.trim() === '') return;

            // Get selected fruit
            var fruitName = "";
            var fruitRadios = document.getElementsByClassName("fruit");
            for (var fi = 0; fi < fruitRadios.length; fi++) {
              if (fruitRadios[fi].getAttribute("aria-checked") === "true") {
                fruitName = fruitRadios[fi].getAttribute("value") || "";
              }
            }

            // Get selected countries
            var countryNames: string[] = [];
            var selElem = document.getElementsByClassName("country_sel")[0];
            if (selElem) {
              var children = Array.from(selElem.children);
              children.forEach(function(child) { if (child.id) countryNames.push(child.id); });
            }

            // Build share text with full context
            var shareText = "Citrus MRL V6.0 Results\n";
            shareText += "Fruit: " + fruitName + "\n";
            shareText += "Countries: " + countryNames.join(", ") + "\n";
            shareText += "---\n";
            var rows = demoEl.querySelectorAll("ion-row");
            rows.forEach(function(row) {
              var cols = row.querySelectorAll("ion-col");
              var line = "";
              cols.forEach(function(col) { line += (col.textContent || "").trim() + "  |  "; });
              shareText += line.slice(0, -5) + "\n";
            });
            shareText += "---\nGenerated by Citrus MRL App";

            try {
              await Share.share({ title: 'Citrus MRL - ' + fruitName, text: shareText, dialogTitle: 'Share MRL Results' });
            } catch(e) {}
          }}>
            share
          </IonButton>
          }

        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
export default Home;
