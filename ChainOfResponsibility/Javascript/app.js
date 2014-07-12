var app = app || (function() {

    var Approval = function(amount){
        this.amount = amount;
        this.next = null;

    }

    Approval.prototype = {
        "method": function(data) {
            console.log('this is calling method basic amount ' + this.amount)
            console.log(data);
        },
        "approval": function(data) {
            if(data.level < this.amount) {
                this.method(data);
            } else if(this.next != undefined) {
                this.next.approval(data);
            } else {
                // next has not been assigned. we are at the end of the chain.
                console.log('this value is too large for our appraisers to evaluate. ')
            }
        },
        "setNextApprover": function(approver){
            this.next = approver;
        }

    }

    var approval100 = new Approval(100),
        approval200 = new Approval(200),
        approval300 = new Approval(300),
        approval400 = new Approval(400),
        approval500 = new Approval(500),
        approval600 = new Approval(600),
        approval700 = new Approval(700);

    approval100.setNextApprover(approval200);
    approval100.method = function(data) {
        console.log('for the 100 level. we are doing something different. ')
        console.log(data);

    }

    approval200.setNextApprover(approval300);
    approval300.setNextApprover(approval400);
    approval400.setNextApprover(approval500);
    approval500.setNextApprover(approval600);
    approval600.setNextApprover(approval700);

    return {
        "getApproval": function(userDetails) {
            // start at the bottom of the stack. it will work its way up.
            approval100.approval(userDetails);
        }
    };

}());


var userDetails = {"level": 900, "user": {"name": "tester", "dob": "12-12-2014"}};
app.getApproval(userDetails);
userDetails.level = 90;
app.getApproval(userDetails)
