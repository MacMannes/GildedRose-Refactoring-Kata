export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    update() {
        if (this.isSulfuras()) return;

        this.updateSellIn();
        this.updateQuality();
    }

    private updateSellIn() {
        this.sellIn = this.sellIn - 1;
    }

    private updateQuality() {
        if (this.sellIn < 0 && this.isBackstagePass()) {
            this.quality = 0;
            return;
        }

        const amount = this.computeQualityAdjustment();
        this.adjustQuality(amount);
    }

    private computeQualityAdjustment(): number {
        if (this.isBackstagePass() && this.sellIn < 5) return 3;
        if (this.isBackstagePass() && this.sellIn < 10) return 2;

        if (this.sellIn < 0) return 2;

        return 1;
    }

    private adjustQuality(amount: number) {
        const adjustmentFactor = this.computeQualityAdjustmentFactor();
        this.quality = Math.max(
            0,
            Math.min(this.quality + amount * adjustmentFactor, 50),
        );
    }

    private computeQualityAdjustmentFactor(): number {
        if (this.shouldIncreaseQuality()) return 1;

        return -1;
    }

    private shouldIncreaseQuality(): boolean {
        return this.isAgedBrie() || this.isBackstagePass();
    }

    private isSulfuras() {
        return this.name == 'Sulfuras, Hand of Ragnaros';
    }

    private isAgedBrie() {
        return this.name == 'Aged Brie';
    }

    private isBackstagePass() {
        return this.name == 'Backstage passes to a TAFKAL80ETC concert';
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            item.update();
        }

        return this.items;
    }
}
