import sinon from 'sinon';
import { expect } from 'chai';
import Service from '../src/service.js';
import PrimaryRepository from '../src/repository.js';
import SecondaryRepository from '../src/secondaryRepository.js';

describe('Service Integration Test with Multiple Stubs', () => {
    let service;
    let primaryRepositoryStub;
    let secondaryRepositoryStub;

    beforeEach(() => {
        primaryRepositoryStub = sinon.createStubInstance(PrimaryRepository);
        secondaryRepositoryStub = sinon.createStubInstance(SecondaryRepository);
        service = new Service();
        service.primaryRepository = primaryRepositoryStub;
        service.secondaryRepository = secondaryRepositoryStub;
    });

    it('should return item from primary repository if found', () => {
        const item = { id: 1, name: 'Item 1' };
        primaryRepositoryStub.getItemById.withArgs(1).returns(item);

        const result = service.getItemById(1);

        expect(result).to.deep.equal(item);
        expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.notCalled).to.be.true;
    });

    it('should return item from secondary repository if not found in primary', () => {
        primaryRepositoryStub.getItemById.withArgs(3).returns(null);
        const item = { id: 3, name: 'Item 3' };
        secondaryRepositoryStub.getItemById.withArgs(3).returns(item);

        const result = service.getItemById(3);

        expect(result).to.deep.equal(item);
        expect(primaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
    });

    it('should throw an error if item is not found in both repositories', () => {
        primaryRepositoryStub.getItemById.returns(null);
        secondaryRepositoryStub.getItemById.returns(null);
        expect(() => service.getItemById(5)).to.throw('Item not found in both repositories');
        expect(primaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
    });

    it('should delete item from primary repository if found', () => {
        primaryRepositoryStub.deleteItem.withArgs(1).returns(null)
        const item = { id: 1, name: 'Item 1' }
        secondaryRepositoryStub.deleteItem.withArgs(1).returns(item)
    
        const result = service.deleteItem(1)
    
        expect(result).to.deep.equal(item)
        expect(primaryRepositoryStub.deleteItem.calledOnceWith(1)).to.be.true
        expect(secondaryRepositoryStub.deleteItem.calledOnceWith(1)).to.be.true
    })
    
    it('should throw an error if item is not found in both repositories', () => {
        primaryRepositoryStub.deleteItem.withArgs(3).returns(null)
        secondaryRepositoryStub.deleteItem.withArgs(3).returns(null)
    
        expect(() => service.deleteItem(3)).to.throw('Item not found in both repositories')
        expect(primaryRepositoryStub.deleteItem.calledOnceWith(3)).to.be.true
        expect(secondaryRepositoryStub.deleteItem.calledOnceWith(3)).to.be.true
    })

});
