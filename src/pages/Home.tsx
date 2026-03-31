import React, { useState, useEffect } from 'react';
import { isPlatform, getPlatforms } from '@ionic/react';

import { IonFooter, IonListHeader, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRadio, IonCheckbox, IonList, IonItem, IonLabel, IonButton, IonRadioGroup, IonAlert, IonModal, IonSearchbar } from '@ionic/react';
import * as serviceWorker from '../serviceWorker';
import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { LocalNotifications } from '@capacitor/local-notifications';
import { RateApp } from 'capacitor-rate-app';

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
  // Haptic on fruit selection
  if (isNative) { try { Haptics.impact({style: ImpactStyle.Light}); } catch(e){} }

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

// All country names available in the app for the first-time picker
var allCountryNames = country_arr.map(function(c) { return c.country; }).filter(function(v, i, a) { return a.indexOf(v) === i; });

const Home: React.FC = () => {
  const [showAlert0, setShowAlert0] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [suggestedCountry, setSuggestedCountry] = useState('');

  // First-time setup, restore selection, rating prompt
  useEffect(() => {
    async function initApp() {
      try {
        // === First-time country detection/selection ===
        var homeCountry = await Preferences.get({ key: 'homeCountry' });
        if (!homeCountry.value) {
          // Try auto-detect country via IP, fallback to RSA
          var suggestion = 'RSA';
          try {
            var controller = new AbortController();
            setTimeout(function() { controller.abort(); }, 3000);
            var resp = await fetch('https://ipapi.co/country/', { signal: controller.signal });
            var code = await resp.text();
            var detected = isoToAppCountry[code.trim()];
            if (detected) {
              suggestion = detected;
            }
          } catch(e) {}
          setSuggestedCountry(suggestion);
          // Always show picker on first launch so user can confirm/change
          setShowCountryPicker(true);
        } else {
          detectedCountry = homeCountry.value;
        }

        // === Track usage for rating prompt ===
        var useCount = await Preferences.get({ key: 'useCount' });
        var count = useCount.value ? parseInt(useCount.value) : 0;
        count++;
        await Preferences.set({ key: 'useCount', value: String(count) });

        // Show rating prompt after 10 uses, then every 30 uses
        var lastRated = await Preferences.get({ key: 'lastRatedAt' });
        var lastRatedCount = lastRated.value ? parseInt(lastRated.value) : 0;
        if (isNative && count >= 10 && (count - lastRatedCount) >= 20) {
          setTimeout(async function() {
            try {
              await RateApp.requestReview();
              await Preferences.set({ key: 'lastRatedAt', value: String(count) });
            } catch(e) {}
          }, 3000);
        }

        // === Request notification permission on first use ===
        if (isNative && count === 1) {
          try { await LocalNotifications.requestPermissions(); } catch(e) {}
        }

        // === Load favorite or restore last selection ===
        var loadFav = await Preferences.get({ key: 'loadFavorite' });
        if (loadFav.value) {
          await Preferences.remove({ key: 'loadFavorite' });
          var fav = JSON.parse(loadFav.value);

          setTimeout(function() {
            setSelected(fav.fruit);
            filterCountriesByFruit(fav.fruit);

            setTimeout(function() {
              var countrySelElem = document.getElementsByClassName("country_sel")[0];
              if (countrySelElem) { countrySelElem.innerHTML = ''; }
              var allCheckboxes = document.querySelectorAll('.scroll ion-item');
              allCheckboxes.forEach(function(item) {
                var cb = item.querySelector('ion-checkbox') as any;
                if (cb) { cb.checked = false; }
              });

              filterInProgress = true;
              fav.countries.forEach(function(countryName: string) {
                var items = document.querySelectorAll('.scroll ion-item');
                items.forEach(function(item) {
                  var el = item as HTMLElement;
                  if (el.id === countryName) {
                    var cb = el.querySelector('ion-checkbox') as any;
                    if (cb) {
                      cb.checked = true;
                      if (countrySelElem) {
                        var lbl = document.createElement("IonLabel");
                        lbl.innerHTML = "<div>" + countryName + "</div>";
                        lbl.id = countryName;
                        countrySelElem.appendChild(lbl);
                      }
                    }
                  }
                });
              });
              filterInProgress = false;

              setTimeout(function() {
                var submitBtn = document.querySelector('ion-footer ion-button') as any;
                if (submitBtn) { submitBtn.click(); }
              }, 300);
            }, 300);
          }, 500);
          return;
        }

        // Normal restore: just restore last fruit
        var savedFruit = await Preferences.get({ key: 'lastFruit' });
        if (savedFruit.value) {
          setTimeout(function() {
            setSelected(savedFruit.value as string);
            filterCountriesByFruit(savedFruit.value as string);
          }, 500);
        }
      } catch(e) {}
    }
    initApp();
  }, []);

  const check_fun = async () => {
     var fruit_s:string = "";
     var country_s1:string[] = [];
     var final_result:any[] = [];
     var x = document.getElementsByClassName("country");
     for (var i = 0; i < x.length; i++) {
        if (x[i].getAttribute("aria-checked") === "true") {
            var str_c:string = (x[i].getAttribute("value") || "");
            country_s1.push(str_c);
        }
     }

     // Get selected fruit from state (chips, not radio buttons)
     fruit_s = selected;
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
    var html_str:string = "<div class='mrl-cards'>";
    for (var i3 = 0; i3 < final_result.length; i3++) {
       if (final_result[i3].mrl !== "N") {
            var mrlVal = final_result[i3].mrl;
            var badgeClass = 'mrl-badge';
            if (mrlVal === "∞") { badgeClass += ' mrl-badge-inf'; }
            else if (mrlVal === "#") { badgeClass += ' mrl-badge-exempt'; }
            else if (parseFloat(mrlVal) <= 2) { badgeClass += ' mrl-badge-low'; }
            html_str += "<div class='mrl-card'>"
              + "<div class='mrl-card-top'>"
              + "<div class='mrl-card-name'>" + final_result[i3].active + "</div>"
              + "<div class='" + badgeClass + "'>" + mrlVal + "</div>"
              + "</div>"
              + "<div class='mrl-card-products'>"
              + "<span class='mrl-card-plabel'>Products</span>"
              + "<span class='mrl-card-plist'>" + myFunction(final_result[i3].product) + "</span>"
              + "</div>"
              + "</div>";
       }
    }
    html_str += "</div>";
    document.getElementsByClassName("demo")[0].innerHTML = html_str;
    // Haptic feedback when results appear
    if (isNative) { try { Haptics.notification({type: 'SUCCESS' as any}); } catch(e){} }
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
  const [selected, setSelected] = useState<string>('biff');


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Citrus MRL V6.0</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{"--background": "#f2f2f7"}}>
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

        {/* First-time home country picker modal */}
        <IonModal isOpen={showCountryPicker} backdropDismiss={false}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Welcome!</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent style={{"--background": "#f2f2f7"}}>
            <div style={{padding: '16px', textAlign: 'center'}}>
              <p style={{fontSize: '15px', color: '#3a3a3c', margin: '0 0 4px'}}>Select your home country</p>
              <p style={{fontSize: '13px', color: '#8e8e93', margin: 0}}>This auto-selects your import country when looking up MRL data.</p>
            </div>
            <IonSearchbar
              placeholder="Search countries..."
              value={countrySearch}
              onIonChange={function(e: any) { setCountrySearch(e.detail.value || ''); }}
              mode="ios"
              style={{padding: '0 8px'}}
            />
            <IonList>
              {/* Show detected country at top if found */}
              {suggestedCountry && (countrySearch === '' || suggestedCountry.toLowerCase().indexOf(countrySearch.toLowerCase()) >= 0) && (
                <IonItem
                  key="suggested"
                  button
                  onClick={async function() {
                    detectedCountry = suggestedCountry;
                    await Preferences.set({ key: 'homeCountry', value: suggestedCountry });
                    if (isNative) { try { Haptics.notification({type: 'SUCCESS' as any}); } catch(e){} }
                    setShowCountryPicker(false);
                    setCountrySearch('');
                  }}
                  lines="full"
                  style={{"--background": "#e8f4fd"}}
                >
                  <IonLabel>
                    <h2 style={{fontWeight: 700}}>{suggestedCountry}</h2>
                    <p style={{color: '#007aff', fontSize: '12px'}}>Detected from your location</p>
                  </IonLabel>
                </IonItem>
              )}
              {/* Rest of countries, filtered by search */}
              {allCountryNames
                .filter(function(name) {
                  if (name === suggestedCountry) return false; // already shown at top
                  if (countrySearch === '') return true;
                  return name.toLowerCase().indexOf(countrySearch.toLowerCase()) >= 0;
                })
                .map(function(name) {
                  return (
                    <IonItem
                      key={name}
                      button
                      onClick={async function() {
                        detectedCountry = name;
                        await Preferences.set({ key: 'homeCountry', value: name });
                        if (isNative) { try { Haptics.notification({type: 'SUCCESS' as any}); } catch(e){} }
                        setShowCountryPicker(false);
                        setCountrySearch('');
                      }}
                      lines="full"
                    >
                      <IonLabel>{name}</IonLabel>
                    </IonItem>
                  );
                })
              }
            </IonList>
          </IonContent>
        </IonModal>

        {/* Reminder notification picker */}
        <IonAlert
          isOpen={showReminderPicker}
          onDidDismiss={() => setShowReminderPicker(false)}
          header={'Set MRL Reminder'}
          message={'When should we remind you to check MRL requirements?'}
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            {
              text: 'Tomorrow',
              handler: async function() {
                try {
                  var fruitName = "";
                  fruitName = selected || "citrus";
                  await LocalNotifications.schedule({
                    notifications: [{
                      title: 'Citrus MRL Reminder',
                      body: 'Check MRL requirements for ' + fruitName,
                      id: Date.now(),
                      schedule: { at: new Date(Date.now() + 24 * 60 * 60 * 1000) }
                    }]
                  });
                  if (isNative) { try { Haptics.notification({type: 'SUCCESS' as any}); } catch(e){} }
                } catch(e) {}
              }
            },
            {
              text: 'In 1 Week',
              handler: async function() {
                try {
                  var fruitName = "";
                  fruitName = selected || "citrus";
                  await LocalNotifications.schedule({
                    notifications: [{
                      title: 'Citrus MRL Reminder',
                      body: 'Check MRL requirements for ' + fruitName,
                      id: Date.now(),
                      schedule: { at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
                    }]
                  });
                  if (isNative) { try { Haptics.notification({type: 'SUCCESS' as any}); } catch(e){} }
                } catch(e) {}
              }
            },
            {
              text: 'In 30 Days',
              handler: async function() {
                try {
                  var fruitName = "";
                  fruitName = selected || "citrus";
                  await LocalNotifications.schedule({
                    notifications: [{
                      title: 'Citrus MRL Reminder',
                      body: 'Check MRL requirements for ' + fruitName,
                      id: Date.now(),
                      schedule: { at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
                    }]
                  });
                  if (isNative) { try { Haptics.notification({type: 'SUCCESS' as any}); } catch(e){} }
                } catch(e) {}
              }
            }
          ]}
        />

        {/* ===== HERO CARD ===== */}
        <div className="hero-card">
          <img className="logo_img" alt="ICA Logo" src="/assets/img/logo1.png" />
          <div className="hero-title">Citrus MRL V6.0</div>
          <div className="hero-icons">
            <img alt="Facebook" src="/assets/img/facebook.png" onClick={function() {window.open("https://www.facebook.com/ICAInternationalChemicals/?rf=1585922241735402",'_system', 'location=yes');}}/>
            <img alt="Website" src="/assets/img/website_logo.png" onClick={function() {window.open("http://icaonline.co.za",'_system', 'location=yes');}}/>
            <img alt="Magazine" src="/assets/img/bros.png" onClick={function() {window.open("https://visualprojects.co.za/Info-Hub/ICA/",'_system', 'location=yes');}} />
            <img alt="Magazine" src="/assets/img/bros1.png" onClick={function() {window.open("https://testicamobilemagazine.web.app/products_bros.html",'_system', 'location=yes');}} />
          </div>
          <div className="hero-buttons">
            <IonButton size="small" href="#/dosage"><IonLabel>Dosages (RSA)</IonLabel></IonButton>
            <IonButton size="small" href="#/label"><IonLabel>Products</IonLabel></IonButton>
          </div>
        </div>

        {/* ===== FRUIT CHIPS ===== */}
        <div className="settings-section-header">SELECT FRUIT</div>
        <div className="fruit-chips">
          {fruit_arr.map(({ fruit }, i) => (
            <div
              key={i}
              className={"fruit-chip fruit" + (selected === fruit ? " fruit-chip-selected" : "")}
              data-value={fruit}
              onClick={function() {
                setSelected(fruit);
                filterCountriesByFruit(fruit);
                if (isNative) { try { Haptics.impact({style: ImpactStyle.Light}); } catch(e){} }
              }}
            >
              {fruit}
            </div>
          ))}
        </div>

        {/* ===== COUNTRY SECTION ===== */}
        <div className="settings-section-header">COUNTRY</div>
        <IonSearchbar
          placeholder="Search countries..."
          mode="ios"
          className="country-searchbar"
          id='input_country'
          onIonChange={e => handleInput(e)}
        />
        <div className="scroll1" id="scrolling_div" style={{margin: '0 16px', borderRadius: '12px', overflow: 'hidden'}}>
          <IonList className="scroll" mode="ios" style={{background: '#fff'}}>
            {country_arr.map(({ country, sub, isCheck }, i) => (
              <IonItem key={i} id={country} class={country} lines="full">
                <IonCheckbox onIonChange={function (e) {event_handle(e);}} slot="start" class="country" id={country} value={sub} name={country} checked={isCheck} mode="ios"/>
                <IonLabel>{country}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </div>

        {/* ===== SELECTED COUNTRIES ===== */}
        <div className="settings-section-header">SELECTED COUNTRIES</div>
        <div className="selected-countries-wrap">
          <IonList class="country_sel" className="selected-countries-chips"> <IonLabel id="RSA"> <div>RSA</div> </IonLabel> </IonList>
        </div>

        {/* ===== LEGEND & RESULTS ===== */}
        <div className="home-note">
          <span style={{color: '#ff3b30'}}>Residues must comply with import as well as export country (RSA) MRLs.</span>
          <br/>
          <span style={{color: '#800080'}}>&#8734; No residue &nbsp;&nbsp; # Exempt from MRL (EU)</span>
        </div>
        <div className="results-heading">
          <h1>Results</h1>
          <span className="results-count" id="results-count"></span>
        </div>
        <div className="demo">
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar color="primary" style={{textAlign: 'center', padding: '4px 8px'}}>

          <IonButton color="light" onClick={async function() {
            if (isNative) { try { await Haptics.impact({style: ImpactStyle.Medium}); } catch(e){} }
            check_fun(); go_bottom();
            // Update results count
            setTimeout(function() {
              var cards = document.querySelectorAll('.mrl-card');
              var countEl = document.getElementById('results-count');
              if (countEl && cards.length > 0) { countEl.textContent = cards.length + ' results'; }
            }, 100);
          }}>
            Submit
          </IonButton>

          <IonButton color="light" onClick={async function() {
            if (isNative) { try { await Haptics.impact({style: ImpactStyle.Light}); } catch(e){} }
            // Get current fruit and countries
            var fruitName = "";
            fruitName = selected;
            var countryNames: string[] = [];
            var selElem = document.getElementsByClassName("country_sel")[0];
            if (selElem) {
              Array.from(selElem.children).forEach(function(child) { if (child.id) countryNames.push(child.id); });
            }
            if (!fruitName || countryNames.length === 0) return;

            // Load existing favorites, add new, save
            var existing = await Preferences.get({ key: 'favorites' });
            var favs: any[] = [];
            if (existing.value) { try { favs = JSON.parse(existing.value); } catch(e){} }
            // Check for duplicate
            var isDup = favs.some(function(f: any) { return f.fruit === fruitName && JSON.stringify(f.countries) === JSON.stringify(countryNames); });
            if (isDup) { alert('Already in favorites!'); return; }
            favs.push({ fruit: fruitName, countries: countryNames, savedAt: new Date().toISOString() });
            await Preferences.set({ key: 'favorites', value: JSON.stringify(favs) });
            if (isNative) { try { await (Haptics as any).notification({type: 'SUCCESS'}); } catch(e){} }
            alert('Saved to Favorites!');
          }}>
            &#9734; Save
          </IonButton>

          {isPlatform('ios') && isNative &&
          <IonButton color="light" onClick={async function() {
            var demoEl = document.getElementsByClassName("demo")[0];
            if (!demoEl || !demoEl.textContent || demoEl.textContent.trim() === '') return;
            var fruitName = "";
            fruitName = selected;
            var countryNames: string[] = [];
            var selElem = document.getElementsByClassName("country_sel")[0];
            if (selElem) {
              Array.from(selElem.children).forEach(function(child) { if (child.id) countryNames.push(child.id); });
            }
            var shareText = "Citrus MRL V6.0 Results\n";
            shareText += "Fruit: " + fruitName + "\n";
            shareText += "Countries: " + countryNames.join(", ") + "\n---\n";
            var cards = demoEl.querySelectorAll('.mrl-card');
            cards.forEach(function(card) {
              var name = card.querySelector('.mrl-card-name');
              var mrl = card.querySelector('.mrl-badge');
              var products = card.querySelector('.mrl-card-plist');
              shareText += (name ? name.textContent : '') + " | MRL: " + (mrl ? mrl.textContent : '') + " | " + (products ? products.textContent : '') + "\n";
            });
            shareText += "---\nGenerated by Citrus MRL App";
            try {
              await Share.share({ title: 'Citrus MRL - ' + fruitName, text: shareText, dialogTitle: 'Share MRL Results' });
            } catch(e) {}
          }}>
            Share
          </IonButton>
          }

          {isNative &&
          <IonButton color="light" onClick={function() {
            setShowReminderPicker(true);
          }}>
            Remind
          </IonButton>
          }

        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
export default Home;
