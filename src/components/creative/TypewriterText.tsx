import {useEffect,useState} from 'react';
export function TypewriterText({words=['Create something remarkable'],speed=55,className=''}:{words?:string[];speed?:number;className?:string}){
const [word,setWord]=useState(0);const [count,setCount]=useState(0);const [back,setBack]=useState(false);
useEffect(()=>{if(!words.length)return;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setCount(words[word%words.length].length);return;}
const current=words[word%words.length];const delay=!back&&count===current.length?1600:back?Math.max(35,speed/2):speed;
const id=window.setTimeout(()=>{if(!back&&count===current.length){setBack(true)}else if(back&&count===0){setBack(false);setWord(v=>v+1)}else setCount(v=>v+(back?-1:1))},delay);return()=>clearTimeout(id)},[word,count,back,words,speed]);
return <span className={className} aria-label={words[word%words.length]??''}>{(words[word%words.length]??'').slice(0,count)}<span aria-hidden="true" className="animate-pulse text-violet-400">|</span></span>;
}
