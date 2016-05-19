angular.module('cover4App.services', [])

.factory('Policies', function() {
    var list = [
        { id: 0, title: 'Student Insurance', href: 'http://studentpossessions.cover4insurance.com' },
        { id: 1, title: 'Tenant Insurance', href: 'http://tenantinsurance.cover4insurance.com' },
        { id: 2, title: 'Block Halls', href: 'http://blockhalls.cover4insurance.com' },
        { id: 3, title: 'Irish Student Insurance', href: 'http://irishstudent.cover4insurance.com' },
        { id: 4, title: 'Specialist Product Insurance', href: 'http://product.cover4insurance.com' }
    ];
    
    return {
        getAll: function() {
            return list;
        },
        get: function(id) {
            for(var x = 0; x < list.length; x++) {
                if(list[x].id == id) {
                    return list[x];
                }
            }
            
            return false;
        }
    }
})

.factory('Notifications', function($localStorage) {
    $localStorage = $localStorage.$default({
        notes: [] 
    });
    
    return {
        getAll: function() {
            return $localStorage.notes;
        },
        add: function(note) {
            $localStorage.notes.push(note);
        },
        clear: function() {
            $localStorage.$reset({notes: []});
        },
        getUnreadCount: function() {
            var count = 0;
            for(var x = 0; x < $localStorage.notes.length; x++) {
                if(!$localStorage.notes[x].read) {
                    count++;
                } 
            }
            return count;
        },
        markAllRead: function() {
            for (var x = 0; x < $localStorage.notes.length; x++) {
                if(!$localStorage.notes[x].read) {
                    $localStorage.notes[x].read = true;
                }
            }
        },
        // If the timestamp is already saved in database return true
        isDuplicate: function(note) {
            for(var x = 0; x < $localStorage.notes.length; x++) {
                if(note.timestamp == $localStorage.notes[x].timestamp) {
                    return true;
                }
            }
            
            return false;
        }
    }
})