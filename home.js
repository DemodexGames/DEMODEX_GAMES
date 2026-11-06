(()=>{
  const screen=document.getElementById('glitch-screen');
  const playGlitch=()=>{
    try{
      const AudioContext=window.AudioContext||window.webkitAudioContext;
      if(!AudioContext)return;
      const audio=new AudioContext();if(audio.state==='suspended')audio.resume().catch(()=>{});const now=audio.currentTime;
      const master=audio.createGain();master.gain.setValueAtTime(.55,now);master.connect(audio.destination);
      const buffer=audio.createBuffer(1,Math.floor(audio.sampleRate*.2),audio.sampleRate);
      const channel=buffer.getChannelData(0);for(let i=0;i<channel.length;i++)channel[i]=(Math.random()*2-1)*(1-i/channel.length);
      const noise=audio.createBufferSource();noise.buffer=buffer;
      const filter=audio.createBiquadFilter();filter.type='bandpass';filter.frequency.setValueAtTime(1500,now);filter.frequency.exponentialRampToValueAtTime(260,now+.19);filter.Q.value=.7;
      const noiseGain=audio.createGain();noiseGain.gain.setValueAtTime(.0001,now);noiseGain.gain.linearRampToValueAtTime(.14,now+.018);noiseGain.gain.exponentialRampToValueAtTime(.0001,now+.2);
      noise.connect(filter).connect(noiseGain).connect(master);noise.start(now);noise.stop(now+.21);
      const tone=audio.createOscillator(),toneGain=audio.createGain();tone.type='sawtooth';tone.frequency.setValueAtTime(620,now);tone.frequency.exponentialRampToValueAtTime(72,now+.19);toneGain.gain.setValueAtTime(.0001,now);toneGain.gain.linearRampToValueAtTime(.045,now+.012);toneGain.gain.exponentialRampToValueAtTime(.0001,now+.2);tone.connect(toneGain).connect(master);tone.start(now);tone.stop(now+.21);
      window.setTimeout(()=>audio.close().catch(()=>{}),420);
    }catch{}
  };
  document.querySelectorAll('[data-glitch]').forEach(link=>link.addEventListener('click',event=>{
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){window.location.assign(link.href);return}
    playGlitch();
    screen.classList.add('active');
    document.body.classList.add('glitching');
    window.setTimeout(()=>window.location.assign(link.href),420);
  }));
})();
