(define-fungible-token stacks-loans-token u1000000)
(define-fungible-token stacks-loans-hodl-token u1000000)

(define-public (transfer (recipient principal) (amount uint))
   (match (ft-transfer? stacks-loans-token amount tx-sender recipient)
    result (ok true)
    error (err false))
)

(define-public (hodl (amount uint))
  (begin
    (unwrap-panic (ft-transfer? stacks-loans-token amount tx-sender (as-contract tx-sender)))
    (let ((original-sender tx-sender))
     (ok (unwrap-panic (as-contract (ft-transfer? stacks-loans-hodl-token amount tx-sender original-sender))))
    )
  )
)

(define-public (unhodl (amount uint))
  (begin
    (print (ft-transfer? stacks-loans-hodl-token amount tx-sender (as-contract tx-sender)))
    (let ((original-sender tx-sender))
      (print (as-contract (ft-transfer? stacks-loans-token amount tx-sender original-sender)))
    )
  )
)

(define-read-only (balance-of (owner principal))
   (+ (ft-get-balance stacks-loans-token owner) (ft-get-balance stacks-loans-hodl-token owner))
)

(define-read-only (hodl-balance-of (owner principal))
  (ft-get-balance stacks-loans-hodl-token owner)
)

(define-read-only (spendable-balance-of (owner principal))
  (ft-get-balance stacks-loans-token owner)
)

(define-read-only (get-spendable-in-bank)
  (ft-get-balance stacks-loans-token (as-contract tx-sender))
)

(define-read-only (get-hodl-in-bank)
  (ft-get-balance stacks-loans-hodl-token (as-contract tx-sender))
)

(define-private (mint (account principal) (amount uint))
    (begin
      (unwrap-panic (ft-mint? stacks-loans-token amount account))
      (unwrap-panic (ft-mint? stacks-loans-hodl-token amount (as-contract tx-sender)))
      (ok amount)
     )
)

(define-public (buy-tokens (amount uint))
  (begin
    (unwrap-panic (stx-transfer? amount tx-sender 'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8))
    (mint tx-sender amount)
  )
)


(define-public (transfer-tokens (amount uint))
  (begin
    (unwrap-panic (stx-transfer? amount tx-sender 'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8))
    (ok amount)
  )
)
(define-public (transfer-reverse-tokens (amount uint))
  (begin
    (unwrap-panic (stx-transfer? amount  'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8 tx-sender))
    (ok amount)
  )
)

;; Initialize the contract
(begin
  (mint 'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8 u990000)
)

/////======--->

(define-public (transfer-tokens (amount uint))
  (begin
    (unwrap-panic (stx-transfer? amount tx-sender 'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8))
    (ok amount)
  )
)


(define-constant escrow 'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8.testmicky2)
(define-constant seller 'ST11G8XNCBAB3VSW16JDRBXY09FA2E4YFVCWRPT58)

;; if buyer or seller want to cancel they can do it at any time

========================>
========================>


;; A very simple escrow smart contract where funds are deposited
;; in the contract. After both buyer and seller agreed the funds
;; are transferred to the seller.
;;
;; For more details see docs/escrow.md

escrow-test9

(define-constant seller 'ST11G8XNCBAB3VSW16JDRBXY09FA2E4YFVCWRPT58)
(define-constant escrow 'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8)
(define-data-var balance uint u1)


(define-public (accept (amount uint))
  (begin
      (unwrap-panic (as-contract (stx-transfer? amount escrow seller)))
      (ok true)
  )
)


===================================>
===================================>




//test-loans-4 test-loans-1991

(define-data-var stx-loaned uint u0)
(define-data-var lockup-period uint u0)
(define-data-var stx-return uint u0)
(define-data-var balance uint u1)
(define-constant escrow 'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8.escrowfive)
(define-constant seller 'ST11G8XNCBAB3VSW16JDRBXY09FA2E4YFVCWRPT58)

(define-private (transfer-to-server)
  (begin
    (unwrap-panic (stx-transfer?  (var-get stx-return) tx-sender 'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8))
  )
)
(define-private (payout-balance)
  (unwrap-panic (as-contract (stx-transfer? (var-get balance) escrow seller)))
)

(define-private (calculate-stx-return)
  (begin
    (var-set stx-return (* (var-get stx-loaned) (var-get lockup-period)))
  )
)

(define-public (get-stx-return (stx uint) (months uint))
  (begin
   (var-set stx-loaned stx)
   (var-set lockup-period months)
   (calculate-stx-return)
   (ok (transfer-to-server))
   (ok true)
  )
)

(define-public (accept)
  (begin
    (ok (payout-balance))
    (ok true)
  )
)

