// Feature
class FriendList {
  friends: string[] = [];

  add(name: string): void {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend!`);
  }

  remove(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found');
    }

    this.friends.splice(idx, 1);
  }
}

// Tests
describe('FriendList', () => {

  let friendList: FriendList;

  beforeEach(() => {
    friendList = new FriendList();
  });

  it('initializes friends list', () => {
    expect(friendList.friends.length).toEqual(0);
  });

  it('add frind to the list', () => {
    friendList.add('psalguerodev');
    expect(friendList.friends.length).toBe(1);
  });

  it('announces friendship', () => {
    friendList.announceFriendship = jest.fn();
    expect(friendList.announceFriendship).not.toBeCalled();
    friendList.add('patrick');
    expect(friendList.announceFriendship).toBeCalledTimes(1);
  });

  describe('removedFriend', () => {
    it('removes a friend from the list', () => {
      const friendName = 'psalguerodev';
      friendList.add(friendName);
      expect(friendList.friends[0]).toEqual(friendName);
      friendList.remove('psalguerodev');
      expect(friendList.friends[0]).toBeUndefined();
    });

    it('throws an error as friend does not exists', () => {
      expect(() => friendList.remove('notfoundName')).toThrow(Error);
    });
  });

});
