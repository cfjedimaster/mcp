
document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
	intro:'',
	introModal:false,
	gameOver:false,
	// used in dev so I can skip my cool intro
	skipIntro:false,
    async init() {
		console.log('Shall we play a game?');
		let params = new URLSearchParams(window.location.search);
		this.skipIntro = params.has('skip');
		if(!this.skipIntro) {
			await this.initAnimation();
			this.intro = '';
		}

		this.introModal = true;
		console.log('init done');
    },
	async initAnimation() {
		console.log('i animate the bootup sequence');

		await this.slowPrint('System BIOS v.09892 (Copyright 2021 Omnicorp)','intro');
		await this.delay(2);
		await this.slowPrint('Bootloader fxx.exe (v1)','intro');
		await this.delay(2);
		await this.slowPrint('Checking for updates... ','intro',false);
		await this.delay(2)
		await this.slowPrint('None found.','intro');
		await this.slowPrint('Dectecting IDE Primary Master... ','intro',false);
		await this.delay(2)
		await this.slowPrint('FOUND','intro');
		await this.delay(2)
		await this.slowPrint('Dectecting IDE Primary Slave... ','intro',false);
		await this.delay(2)
		await this.slowPrint('FOUND','intro');
		await this.delay(2);
		await this.slowPrint('Dectecting IDE Secondary Master... ','intro',false);
		await this.delay(2)
		await this.slowPrint('NOT FOUND','intro');
		await this.delay(2);
		await this.slowPrint('Dectecting IDE Secondary Slave... ','intro',false);
		await this.delay(2)
		await this.slowPrint('NOT FOUND','intro');
		await this.delay(2);
		await this.slowPrint('Finishing boot sequence... ','intro',false);
		await this.delay(2)
	}, 
	async delay(x) {
		return new Promise(resolve => setTimeout(resolve, x * 1000));
	}, 
	async handleKey(e) {
		if(this.gameOver) return;
		if(this.introModal) {
			if(e.key.toUpperCase() === 'N') {
				this.introModal = false;
				await this.slowPrint('GOODBYE','intro');
				this.gameOver = true;
				console.log('GAME OVER MAN');
			} else if(e.key.toUpperCase() === 'Y') {
				this.introModal = false;
				console.log('time to get started');
			}
		}
		console.log('key', e);
	},
	// Utility method to slowly add a string to a variable ref
	async slowPrint(s,ref,addNewline=true) {
		return new Promise(async resolve => {
			for(let i=0;i<s.length;i++) {
				this[ref] += s.charAt(i);
				await this.delay(0.1);
			}
			if(addNewline) this[ref] += '<br>';
			resolve();
		});
	}
  }));
});