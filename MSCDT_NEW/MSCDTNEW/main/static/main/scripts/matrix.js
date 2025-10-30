function startMatrixAnimation(elementIds = ['animatedText']) {
    elementIds.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`Element with id '${elementId}' not found`);
            return;
        }
        
        const finalText = element.textContent;
        const randomChars = '01';
        
        element.innerHTML = '';
        
        let charElements = [];
        
        // Создаем элементы для каждого символа
        for (let i = 0; i < finalText.length; i++) {
            const span = document.createElement('span');
            span.className = 'char random';
            span.textContent = randomChars[Math.floor(Math.random() * randomChars.length)];
            element.appendChild(span);
            charElements.push({
                element: span,
                finalChar: finalText[i],
                done: false,
                index: i
            });
        }
        
        let completedChars = 0;
        const totalChars = charElements.length;
        const randomCycles = 8;
        
        function animateRandomChar() {
            if (completedChars >= totalChars) return;
            
            // Выбираем случайный необработанный символ
            const availableChars = charElements.filter(char => !char.done);
            if (availableChars.length === 0) return;
            
            const randomChar = availableChars[Math.floor(Math.random() * availableChars.length)];
            let cycle = 0;
            
            function randomize() {
                if (cycle < randomCycles) {
                    randomChar.element.textContent = randomChars[Math.floor(Math.random() * randomChars.length)];
                    cycle++;
                    setTimeout(randomize, 30 + Math.random() * 30);
                } else {
                    // Плавный переход к финальному символу
                    randomChar.element.textContent = randomChar.finalChar;
                    randomChar.element.className = 'char final';
                    randomChar.done = true;
                    completedChars++;
                    
                    // Если осталось мало символов - ускоряем завершение
                    const remainingChars = totalChars - completedChars;
                    let nextDelay = 30 + Math.random() * 70;
                    
                    if (remainingChars <= 3) {
                        nextDelay = 10 + Math.random() * 30; // Ускоряем для последних символов
                    }
                    
                    // Запускаем следующий случайный символ
                    if (completedChars < totalChars) {
                        setTimeout(animateRandomChar, nextDelay);
                    }
                }
            }
            
            randomize();
        }
        
        // Функция для завершения оставшихся символов
        function completeRemainingChars() {
            const remainingChars = charElements.filter(char => !char.done);
            remainingChars.forEach((charObj, index) => {
                setTimeout(() => {
                    charObj.element.textContent = charObj.finalChar;
                    charObj.element.className = 'char final';
                    charObj.done = true;
                }, index * 50); // Быстро завершаем оставшиеся
            });
        }
        
        // Запускаем несколько символов одновременно
        const simultaneousChars = Math.min(3, totalChars);
        for (let i = 0; i < simultaneousChars; i++) {
            setTimeout(() => {
                animateRandomChar();
            }, i * 200);
        }
        
        // На всякий случай - завершаем все символы через 5 секунд
        setTimeout(() => {
            completeRemainingChars();
        }, 5000);
    });
}

// Запускаем анимацию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Укажите нужные ID элементов
    startMatrixAnimation(['animatedText1', 'animatedText2']);
});