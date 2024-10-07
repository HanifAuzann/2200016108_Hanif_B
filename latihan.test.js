import {expect} from 'chai';
import {kurang, bagi} from './math.js';

describe('pengujian tambahan fungsi matematika', function() {
    it('seharusnya mengembalikan -3 saat mengurangkan 2 - 5', function() {
        expect(kurang(2, 5)).to.equal(-3);
    });

    it('seharusnya mengembalikan -5 saat mengurangkan -3 - 2', function() {
        expect(kurang(-3, 2)).to.equal(-5);
    });

    it('seharusnya mengembalikan -2 saat membagi -6 / 3', function() {
        expect(bagi(-6, 3)).to.equal(-2);
    });

    it('seharusnya mengembalikan error saat membagi dengan 0', function() {
        expect(() => bagi(3, 0)).to.throw("tidak bisa membagi dengan nol");
    });

    it('seharusnya mengembalikan error saat menambahkan string "1" + 2', function() {
        expect(() => tambah("1", 2)).to.throw('Input harus berupa angka');
    });

    it('seharusnya mengembalikan error saat mengalikan dengan null * 3', function() {
        expect(() => kali(null, 3)).to.throw('Input harus berupa angka');
    });

});