// 1. Add all your photos and videos here in order
const mediaItems = [
    { type: 'image', src: './media/00.jpg', caption: '"Não vou criar muita expectativa..."' },
    { type: 'image', src: './media/01.jpg', caption: 'O pôr do sol não colaborou e o gelato derreteu, mas a companhia foi perfeita.' },
    { type: 'image', src: './media/02.jpg', caption: 'Nossa primeira foto juntos.' },
    { type: 'image', src: './media/03.jpg', caption: 'Emocionado? Talvez.' },
    { type: 'image', src: './media/04.jpg', caption: 'Último dia de uma das melhores semanas da minha vida... nos vemos no Campeche.' },
    { type: 'image', src: './media/05.jpg', caption: 'Depois do banho de chuva mais romântico da história.' },
    { type: 'image', src: './media/06.jpg', caption: 'Começando o ano da melhor forma possível.' },
    { type: 'video', src: './media/07.mp4', caption: 'Primeira vez correndo juntos.' },
    { type: 'video', src: './media/08.mp4', caption: 'Algumas horas antes do pedido de namoro.' },
    { type: 'video', src: './media/09.mp4', caption: '02/01/2026: oficialmente namorados.' },
    { type: 'image', src: './media/10.jpg', caption: '❤️' },
    { type: 'video', src: './media/11.mp4', caption: 'Primeira vez vendo o nascer do sol juntos.' },
    { type: 'image', src: './media/12.jpg', caption: 'Primeira trilha juntos.' },
    { type: 'video', src: './media/13.mp4', caption: 'A atleta mais perfeita que existe.' },
    { type: 'video', src: './media/14.mp4', caption: 'Último dia de praia.' },
    { type: 'video', src: './media/15.mp4', caption: 'Últimos minutos em Florianópolis.' },
    { type: 'video', src: './media/16.mp4', caption: 'Perdemos o ônibus...' },
    { type: 'video', src: './media/17.mp4', caption: '...mas deu tudo certo.' },
    { type: 'video', src: './media/18.mp4', caption: 'A melhor dupla de boliche da história.' },
    { type: 'image', src: './media/19.jpg', caption: 'Nosso principal hobby de casal: comer cinnamon roll.' },
    { type: 'image', src: './media/20.jpg', caption: 'O melhor fondue das nossas vidas.' },
    { type: 'image', src: './media/21.jpg', caption: 'O casal mais cremoso que Gramado já viu.' },
    { type: 'image', src: './media/22.jpg', caption: '"Te Creo" - Sofia Pasa' },
    { type: 'image', src: './media/23.jpg', caption: 'Nosso segundo hobby mais importante: passear no Moinhos.' },
    { type: 'image', src: './media/24.jpg', caption: 'Ojitos lindos.' },
    { type: 'image', src: './media/25.jpg', caption: 'Acidente.' },
    { type: 'image', src: './media/26.jpg', caption: 'Hasta luego...' },
    { type: 'image', src: './media/27.jpg', caption: 'Temos 80 anos pela frente.' },
];

let currentIndex = 0;

// Elements
const startBtn = document.getElementById('start-btn');
const bgMusic = document.getElementById('bg-music');
const mediaDisplay = document.getElementById('media-display');
const caption = document.getElementById('caption');
const controls = document.getElementById('controls');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Start everything (Needed because browsers block audio autoplay)
startBtn.addEventListener('click', () => {
    bgMusic.play();
    bgMusic.volume = 0.5; // ou volumeNormal se você estiver usando aquela variável
    
    // Suaviza a saída do botão
    startBtn.classList.add('fade-out');
    
    // Espera 500ms (o tempo da animação do CSS) antes de mostrar a galeria
    setTimeout(() => {
        startBtn.classList.add('hidden');
        mediaDisplay.classList.remove('hidden');
        caption.classList.remove('hidden');
        controls.classList.remove('hidden');
        
        updateDisplay();
    }, 500);
});

// Função intermediária para suavizar a troca de fotos/vídeos
function changeMediaSuave(newIndex) {
    // 1. Apaga a mídia e a legenda atual
    mediaDisplay.classList.add('fade-out');
    caption.classList.add('fade-out');
    
    // 2. Espera a tela ficar escura (400ms)
    setTimeout(() => {
        currentIndex = newIndex;
        updateDisplay(); // Renderiza a nova mídia "no escuro"
        
        // 3. Um micro-atraso para garantir que o navegador já carregou a nova imagem
        setTimeout(() => {
            // Acende a tela novamente com a nova mídia
            mediaDisplay.classList.remove('fade-out');
            caption.classList.remove('fade-out');
        }, 50);
        
    }, 400); 
}

// Navigation Logic
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        changeMediaSuave(currentIndex - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < mediaItems.length - 1) {
        changeMediaSuave(currentIndex + 1);
    }
});

// Function to update the photo or video
function updateDisplay() {
    const currentItem = mediaItems[currentIndex];
    
    // Limpa o conteúdo atual
    mediaDisplay.innerHTML = '';
    
    // Define os volumes (0.0 a 1.0)
    const volumeNormal = 0.5;
    const volumeBaixo = 0.2;

    // Sempre garante que a música volta ao normal ao trocar de slide
    bgMusic.volume = volumeNormal;
    
    if (currentItem.type === 'image') {
        const img = document.createElement('img');
        img.src = currentItem.src;
        mediaDisplay.appendChild(img);
        
    } else if (currentItem.type === 'video') {
        const video = document.createElement('video');
        video.src = currentItem.src;
        video.controls = true; 
        video.autoplay = true; 
        
        // A MÁGICA PARA O CELULAR: Impede que abra em tela cheia automaticamente
        video.playsInline = true; 
        video.setAttribute('playsinline', ''); 
        
        // --- Lógica de Volume Melhorada ---
        
        video.addEventListener('play', () => {
            bgMusic.volume = volumeBaixo;
        });
        
        video.addEventListener('pause', () => {
            bgMusic.volume = volumeNormal;
            // Se o sistema do celular pausou a música à força, manda tocar de novo
            if (bgMusic.paused) {
                bgMusic.play();
            }
        });
        
        video.addEventListener('ended', () => {
            bgMusic.volume = volumeNormal;
            // Se o sistema do celular pausou a música à força, manda tocar de novo
            if (bgMusic.paused) {
                bgMusic.play();
            }
        });
        
        mediaDisplay.appendChild(video);
    }
    
    // Atualiza a legenda
    caption.innerHTML = currentItem.caption;

    // Habilita/Desabilita os botões dependendo da posição
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === mediaItems.length - 1;
}