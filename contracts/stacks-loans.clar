(define-data-var stx-loaned uint u0)
(define-data-var lockup-period uint u0)
(define-data-var stx-return uint u0)
(define-constant loans-wallet 'ST1618RD5WAQMGNX4KQ4KBWBGP0X59BT5P324DB1S)
(define-constant test-wallet 'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8)

(define-public (get-stx-return (stx int) (months int))
    (ok
        (begin 
            (var-set stx-loaned stx)
            (var-set lockup-period months)
            (calculate-stx-return)
            (print (var-get stx-return)) ;; Prints how many stacks they will return.
            (print tx-sender) ;; Prints who calls contract.
            (print loans-wallet)
            (print (stx-get-balance tx-sender)) ;;Prints balance of tx-sender
            (print (stx-get-balance loans-wallet)) ;;Prints balance of loans-wallet
            ;;(unwrap-panic (stx-transfer? stx-loaned loans-wallet tx-sender))
            ;;(unwrap-panic (stx-transfer? u1000 loans-wallet tx-sender))
            ;;(unwrap-panic (stx-transfer? u1 loans-wallet test-wallet))
        )
    )
)

(define-private (calculate-stx-return)
    (ok
        (begin
            (var-set stx-return (- (+ (* (/ (* (to-int (var-get stx-loaned)) 5) 100) (var-get lockup-period)) (var-get stx-loaned)) 5))
        )
    )
)