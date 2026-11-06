(()=>{
  const games=window.DEMODEX_GAMES||[];
  const descriptions={
    'Pulpería La Bendición':'Te contratan para limpiar una pequeña pulpería que se convertirá en un estudio. Un encargo cotidiano abre la puerta a un nuevo espacio de trabajo.',
    'H.E':'Una investigación periodística en el Hospital Escuela abandonado destapa corrupción, experimentación ilegal y criaturas que no deberían seguir vivas.',
    'La logia del Saludo Patrio':'Solo querías recoger un sillón gratis de Marketplace. El trato te lleva ante una sociedad secreta y sus peculiares pruebas patrióticas.',
    'EL SECRETO DE MI FAMILIA':'Controla a SPY-01, una pequeña araña robótica que se infiltra en una casa familiar. Resuelve acertijos y encuentra pistas para descubrir una verdad oculta.',
    'La Chepia':'Te toca examen del himno, no estudiaste y queda un minuto. Busca las respuestas sin que tus profesores te atrapen.',
    'PICACHO':'En las montañas de El Picacho, varias desapariciones apuntan a una leyenda oscura. Explora una gasolinera y el bosque en un horror PSX inspirado en Tegucigalpa.',
    'Dream Corridors':'Despiertas en un laberinto imposible. Encuentra la llave real y escapa de una presencia que siempre vuelve.',
    'Simulador Del  HALCON0.1':'Conversa con HALCON0.1 en una app de mensajería impredecible: audios dinámicos, respuestas agresivas, emojis reactivos y un modo autónomo.',
    'H.E hospital Escuela Mobile Edition':'La investigación de terror psicológico en el Hospital Escuela llega a Android. Explora sus pasillos, reúne evidencia y busca escapar.',
    'TikTok Soccer 2026':'Lleva a tus tiktokers hondureños favoritos a la cancha contra figuras del mundo y busca poner a Honduras en lo más alto.',
    'PERIODISMO DEATHMATCH':'Resuelve debates a patadas en una pelea arcade con personajes inspirados en figuras conocidas y escenarios hondureños.',
    'Morazán vs Zombies':'Un virus llamado Corruption amenaza Honduras. Con una máquina del tiempo llega el General Francisco Morazán para frenar a los zombies y buscar una cura.',
    'Polache vs Zombies Pc Edition':'Un virus transforma a los muertos durante el concierto de Polache. Ayúdalo a enfrentar la invasión zombie en esta aventura de acción.',
    'Don Eduardo Y el Quesito Dorado':'Acompaña a Don Eduardo en un recorrido lleno de obstáculos y enemigos para encontrar el misterioso quesito dorado.',
    'Morazan Vs Zombies X Los Hijos De Morazan':'Acompaña al General Morazán y a los zoquetes para detener una epidemia zombie en esta aventura de acción.',
    'Don Eduardo y El Quesito Dorado Mobile':'Acompaña a Don Eduardo en su travesía móvil, supera obstáculos y enemigos para encontrar el quesito dorado.',
    'Móvil de Emergencia el juego':'Conduce la famosa móvil de emergencia de HCH, esquiva autos y ayuda a Don Eduardo, Allan y Ariela a llegar a su destino.',
    'Las aventuras del patero':'Recoge pachitas como nuestro amigo el patero y esquiva obstáculos, sierras, basura y monstruos por el camino.',
    'Too Long':'Controla a un gusano galáctico que crece mientras recoge puntos. Ajusta el zoom para cambiar la velocidad y encontrar más nibbles.',
    'Regateo Catracho':'Ayuda a la Selección de Honduras a regatear y recoge monedas para avanzar y ganar el partido.',
    'The baleada':'Guía a una pequeña baleada para escapar del restaurante antes de que la devoren. Esquiva los martillos y supera el récord.',
    'Busero Simulator':'Conduce como busero, recoge pasajes en la calle y esquiva las sierras en este mini juego con su propia banda sonora.',
    'CDA defense':'Defiende la Central de Abastos junto a un grupo de sobrevivientes en una Honduras invadida por infectados.',
    "Wendy's adventures":'Acompaña a la pequeña Wendy a recuperar su receta secreta, robada por un payaso y un rey ambicioso. Supera trampas y obstáculos.'
  };
  const genres={Survival:'Supervivencia',Adventure:'Aventura',Action:'Acción',Sports:'Deportes',Puzzle:'Puzles','Interactive Fiction':'Ficción interactiva'};
  const platforms={
    'Pulpería La Bendición':['PC · Windows'],'H.E':['PC · Windows'],'La logia del Saludo Patrio':['PC · Windows','Navegador'],'EL SECRETO DE MI FAMILIA':['PC · Windows'],'La Chepia':['PC · Windows','Navegador'],'PICACHO':['PC · Windows'],'Dream Corridors':['PC · Windows'],'Simulador Del  HALCON0.1':['Navegador'],'H.E hospital Escuela Mobile Edition':['Android'],'TikTok Soccer 2026':['Navegador'],'PERIODISMO DEATHMATCH':['Navegador'],'Morazán vs Zombies':['Navegador'],'Polache vs Zombies Pc Edition':['Navegador'],'Don Eduardo Y el Quesito Dorado':['Navegador'],'Morazan Vs Zombies X Los Hijos De Morazan':['Navegador'],'Don Eduardo y El Quesito Dorado Mobile':['Navegador'],'Móvil de Emergencia el juego':['Navegador'],'Las aventuras del patero':['Navegador'],'Too Long':['PC · Windows','Navegador'],'Regateo Catracho':['Navegador'],'The baleada':['Navegador'],'Busero Simulator':['Navegador'],'CDA defense':['Navegador'],"Wendy's adventures":['Navegador']
  };
  for(const game of games){game.description=descriptions[game.title]||game.description;game.platforms=platforms[game.title]||game.platforms||[]}
  const grid=document.getElementById('game-grid'),search=document.getElementById('game-search'),count=document.getElementById('game-count'),modal=document.getElementById('game-modal');
  const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const genreLabel=game=>genres[game.genre]||game.genre||'Videojuego';
  const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};
  const openModal=(game,trigger)=>{document.getElementById('modal-image').src=game.cover;document.getElementById('modal-image').alt='Portada de '+game.title;document.getElementById('modal-title').textContent=game.title;document.getElementById('modal-description').textContent=game.description;document.getElementById('modal-meta').textContent=[genreLabel(game),...(game.platforms||[])].join(' · ');document.getElementById('modal-link').href=game.url;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');modal.querySelector('.modal-close').focus()};
  const render=()=>{const query=search.value.trim().toLocaleLowerCase('es');const found=games.map((game,index)=>({game,index})).filter(({game})=>(game.title+' '+game.description+' '+game.genre).toLocaleLowerCase('es').includes(query));count.textContent=query?`${found.length} RESULTADOS`:`${games.length} JUEGOS`;grid.innerHTML=found.length?found.map(({game,index})=>`<article class="game-card"><button class="cover-button" type="button" data-game="${index}" aria-label="Ver resumen de ${escapeHtml(game.title)}"><img loading="lazy" src="${escapeHtml(game.cover)}" alt="Portada de ${escapeHtml(game.title)}"><span class="cover-label">${escapeHtml(genreLabel(game))} · ${String(index+1).padStart(2,'0')}</span></button><div class="card-copy"><div class="card-type">Bitácora · Resumen del juego</div><h2>${escapeHtml(game.title)}</h2><p>${escapeHtml(game.description)}</p><div class="card-bottom"><span class="platform">${escapeHtml((game.platforms||[]).join(' · '))}</span><button class="read-link" type="button" data-game="${index}">Más información ↗</button></div></div></article>`).join(''):'<p class="empty">No encontramos juegos con esa búsqueda.</p>'};
  grid.addEventListener('click',event=>{const trigger=event.target.closest('[data-game]');if(trigger)openModal(games[Number(trigger.dataset.game)],trigger)});
  search.addEventListener('input',render);modal.querySelectorAll('[data-close]').forEach(element=>element.addEventListener('click',closeModal));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal.classList.contains('open'))closeModal()});
  render();setTimeout(()=>document.getElementById('glitch-screen')?.classList.remove('active'),window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:520);
})();
