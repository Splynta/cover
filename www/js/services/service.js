angular.module('cover4App.services', [])

.factory('Policies', function($http) {
    /*var list = [
        { id: 0, title: 'Student Insurance', href: 'http://studentpossessions.cover4insurance.com' },
        { id: 1, title: 'Tenant Insurance', href: 'http://tenantinsurance.cover4insurance.com' },
        { id: 2, title: 'Block Halls', href: 'http://blockhalls.cover4insurance.com' },
        { id: 3, title: 'Irish Student Insurance', href: 'http://irishstudent.cover4insurance.com' },
        { id: 4, title: 'Specialist Product Insurance', href: 'http://product.cover4insurance.com' }
    ];*/
    var list;
    
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
        },
        retrievePolicies: function() {
            $http.get('js/data/policies.js').success(function(data, status, headers, config) {
                list = data;
            });
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

.factory('StudentInfo', function($http) {
    var list = [{ 
            title: 'Security Tips: While You\'re Away', 
            href: 'http://www.cover4insurance.com/security-while-away/',
            filename: 'whileyoureaway.html'
        }, { 
            title: 'Living in a Privately Rented Student House', 
            href: 'http://www.cover4insurance.com/private-student-house/',
            filename: 'privatestudenthouse.html'
        }, {
            title: 'Top 5 Security Tips from Greater Manchester Police Twitter Chat', 
            href: 'http://www.cover4insurance.com/top-5-safety-tips-twitter/',
            filename: 'top5safetytips.html'
        }, {
            title: 'Safety Advice: On a Night Out', 
            href: 'http://www.cover4insurance.com/night-out-safety-tips/',
            filename: 'nightoutsafety.html'
        }, { 
            title: 'Student Security Tips—Ireland', 
            href: 'http://www.cover4insurance.com/irish-student-security-tips',
            filename: 'irishstudentsecurity.html'
        }
    ];
    
    return {
        getList: function() {
            return list;
        },
        get: function(value) {
            return list[value];
        },
        populateFileInfo: function() {
            angular.forEach(list, function(value) {
                $http.get('files/' + value.filename).success(function(data, status, headers, config) {
                    value.data = data;
                }).error(function(){
                });
            });
        }
    }
})